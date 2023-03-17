import NonFungibleToken from "../contracts/standard/NonFungibleToken.cdc"
import YoungApeDiaries from "../contracts/YoungApeDiaries.cdc"
import MetadataViews from "../contracts/standard/MetadataViews.cdc"
import FlowToken from "../contracts/standard/FlowToken.cdc"


transaction(metadataId: UInt64, price: UFix64, _serial: UInt64) {

    let PaymentVault: &FlowToken.Vault
    let CollectionPublic: &YoungApeDiaries.Collection{NonFungibleToken.Receiver}


    prepare(signer: AuthAccount) {
        // Setup
        if signer.borrow<&YoungApeDiaries.Collection>(from: YoungApeDiaries.CollectionStoragePath) == nil {
            signer.save(<- YoungApeDiaries.createEmptyCollection(), to: YoungApeDiaries.CollectionStoragePath)
            signer.link<&YoungApeDiaries.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(YoungApeDiaries.CollectionPublicPath, target: YoungApeDiaries.CollectionStoragePath)
        }

        var paymentPath: StoragePath = /storage/flowTokenVault

        self.PaymentVault = signer.borrow<&FlowToken.Vault>(from: paymentPath)!

        self.CollectionPublic = signer.getCapability(YoungApeDiaries.CollectionPublicPath)
                              .borrow<&YoungApeDiaries.Collection{NonFungibleToken.Receiver}>()
                              ?? panic("Did not properly set up the Example Collection.")

    }

    execute {
        let payment: @FlowToken.Vault <- self.PaymentVault.withdraw(amount: price) as! @FlowToken.Vault
        let nftId = YoungApeDiaries.mintNFT(metadataId: metadataId, recipient: self.CollectionPublic, payment: <- payment, serial: _serial)
        log("An NFT has been minted successfully!")
    }

}
