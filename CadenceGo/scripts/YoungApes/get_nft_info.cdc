import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

pub fun main(metadataId: UInt64): YoungApeDiaries.NFTMetadata? {
  return YoungApeDiaries.getNFTMetadata(metadataId)
}