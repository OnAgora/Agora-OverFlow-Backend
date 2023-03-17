import FlowToken from "../../contracts/standard/FlowToken.cdc"
import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"
import FungibleToken from "../../contracts/standard/FungibleToken.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"
import NFTStorefrontV2 from "../../contracts/standard/NFTStorefrontV2.cdc"
import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

pub fun getOrCreateStorefront(account: AuthAccount): &NFTStorefrontV2.Storefront {
    if let storefrontRef = account.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) {
        return storefrontRef
    }

    let storefront <- NFTStorefrontV2.createStorefront()

    let storefrontRef = &storefront as &NFTStorefrontV2.Storefront

    account.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)

    account.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath, target: NFTStorefrontV2.StorefrontStoragePath)

    return storefrontRef
}

transaction(saleItemID: UInt64, saleItemPrice: UFix64) {

    let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let YoungApeDiariesProvider: Capability<&YoungApeDiaries.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &NFTStorefrontV2.Storefront

    prepare(account: AuthAccount) {
        // We need a provider capability, but one is not provided by default so we create one if needed.
        let YoungApeDiariesCollectionProviderPrivatePath = /private/YoungApeDiariesCollectionProviderV14

        self.flowReceiver = account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FLOW receiver")

        if !account.getCapability<&YoungApeDiaries.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(YoungApeDiariesCollectionProviderPrivatePath).check() {
            account.link<&YoungApeDiaries.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(YoungApeDiariesCollectionProviderPrivatePath, target: YoungApeDiaries.CollectionStoragePath)
        }

        self.YoungApeDiariesProvider = account.getCapability<&YoungApeDiaries.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(YoungApeDiariesCollectionProviderPrivatePath)

        assert(self.YoungApeDiariesProvider.borrow() != nil, message: "Missing or mis-typed YoungApeDiaries.Collection provider")

        self.storefront = getOrCreateStorefront(account: account)
    }

    execute {
        let saleCut = NFTStorefrontV2.SaleCut(
            receiver: self.flowReceiver,
            amount: saleItemPrice
        )
        self.storefront.createListing(
            nftProviderCapability: self.YoungApeDiariesProvider,
            nftType: Type<@YoungApeDiaries.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            saleCuts: [saleCut],
            marketplacesCapability: nil, // [Capability<&{FungibleToken.Receiver}>]?
            customID: nil, // String?
            commissionAmount: 0.0,
            expiry: UInt64(getCurrentBlock().timestamp) + 500
        )
    }
}
