import FlowToken from "../../contracts/standard/FlowToken.cdc"
import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"
import FungibleToken from "../../contracts/standard/FungibleToken.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"
import NFTStorefrontV2 from "../../contracts/standard/NFTStorefrontV2.cdc"
import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

pub fun getOrCreateCollection(account: AuthAccount): &YoungApeDiaries.Collection{NonFungibleToken.Receiver} {
    if let collectionRef = account.borrow<&YoungApeDiaries.Collection>(from: YoungApeDiaries.CollectionStoragePath) {
        return collectionRef
    }

    // create a new empty collection
    let collection <- YoungApeDiaries.createEmptyCollection() as! @YoungApeDiaries.Collection

    let collectionRef = &collection as &YoungApeDiaries.Collection

    // save it to the account
    account.save(<-collection, to: YoungApeDiaries.CollectionStoragePath)

    // create a public capability for the collection
    account.link<&YoungApeDiaries.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver}>(YoungApeDiaries.CollectionPublicPath, target: YoungApeDiaries.CollectionStoragePath)

    return collectionRef
}

transaction(listingResourceID: UInt64, storefrontAddress: Address) {
    let paymentVault: @FungibleToken.Vault
    let YoungApeDiariesCollection: &YoungApeDiaries.Collection{NonFungibleToken.Receiver}
    let storefront: &NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}
    let listing: &NFTStorefrontV2.Listing{NFTStorefrontV2.ListingPublic}

    prepare(account: AuthAccount) {
        // Access the storefront public resource of the seller to purchase the listing.
        self.storefront = getAccount(storefrontAddress)
            .getCapability<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
                NFTStorefrontV2.StorefrontPublicPath
            )
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

        // Borrow the listing
        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
                    ?? panic("No Offer with that ID in Storefront")
        let price = self.listing.getDetails().salePrice

        // Access the vault of the buyer to pay the sale price of the listing.
        let mainFlowVault = account.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from account storage")
        self.paymentVault <- mainFlowVault.withdraw(amount: price)

        self.YoungApeDiariesCollection = getOrCreateCollection(account: account)
    }

    execute {
        let item <- self.listing.purchase(
            payment: <-self.paymentVault,
            commissionRecipient: nil
        )

        self.YoungApeDiariesCollection.deposit(token: <-item)
        self.storefront.cleanupPurchasedListings(listingResourceID: listingResourceID)
    }
}
