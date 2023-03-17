import NonFungibleToken from "../contracts/standard/NonFungibleToken.cdc"
import YoungApeDiaries from "../contracts/YoungApeDiaries.cdc"
import MetadataViews from "../contracts/standard/MetadataViews.cdc"


transaction(_metadataIds: [UInt64], _serials: [UInt64], _recipients: [Address]) {

    let Administrator: &YoungApeDiaries.Administrator


    prepare(admin: AuthAccount) {
        // Confirm Admin
        self.Administrator = admin.borrow<&YoungApeDiaries.Administrator>(from: YoungApeDiaries.AdministratorStoragePath)
                          ?? panic("This account is not the Administrator.")
    }
        pre {
            _metadataIds.length == _serials.length && _serials.length == _recipients.length:
              "You must pass in a same amount of each parameter."
        }

    execute {
        self.Administrator.mintBatch(metadataIds: _metadataIds, serials: _serials, recipients: _recipients)
    }
}

