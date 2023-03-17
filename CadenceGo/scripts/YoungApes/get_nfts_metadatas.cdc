import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"

pub fun main(): {UInt64: YoungApeDiaries.NFTMetadata} {
  return YoungApeDiaries.getNFTMetadatas()
}
