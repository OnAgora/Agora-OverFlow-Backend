import NonFungibleToken from "../contracts/standard/NonFungibleToken.cdc"
import YoungApeDiaries from "../contracts/YoungApeDiaries.cdc"
import MetadataViews from "../contracts/standard/MetadataViews.cdc"

// This transaction configures an account to hold a YoungApeDiary.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&YoungApeDiaries.Collection>(from: YoungApeDiaries.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- YoungApeDiaries.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: YoungApeDiaries.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&YoungApeDiaries.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(YoungApeDiaries.CollectionPublicPath, target: YoungApeDiaries.CollectionStoragePath)
        }
    }
}
