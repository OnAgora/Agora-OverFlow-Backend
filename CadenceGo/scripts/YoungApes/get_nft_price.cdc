import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

pub fun main(metadataId: UInt64): UFix64? {
  return YoungApeDiaries.getPriceOfNFT(metadataId)
}