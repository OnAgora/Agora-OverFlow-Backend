import NonFungibleToken from "../../contracts/standard/NonFungibleToken.cdc"
import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

// This script returns the size of an account's YoungApesDiaries collection.

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(YoungApeDiaries.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")

    return collectionRef.getIDs().length
}
