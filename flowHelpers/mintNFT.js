module.exports = `
import NonFungibleToken from 0x631e88ae7f1d7c20
import YoungApeDiaries from 0x285ca2dc98ed5119
import MetadataViews from 0x631e88ae7f1d7c20
import FlowToken from 0x7e60df042a9c0868


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
`