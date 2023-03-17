import YoungApeDiaries from "../../contracts/YoungApeDiaries.cdc"
import MetadataViews from "../../contracts/standard/MetadataViews.cdc"
pub fun main(): [CollectionDisplay] {
  let answer: [CollectionDisplay] = [CollectionDisplay(
        _contractName: "Young Ape Diaries",
        _name: YoungApeDiaries.getCollectionAttribute(key: "name") as! String,
        _description: YoungApeDiaries.getCollectionAttribute(key: "description") as! String,
        _image: YoungApeDiaries.getCollectionAttribute(key: "image") as! MetadataViews.IPFSFile
      )]

  return answer

}

pub struct CollectionDisplay {
  pub let contractName: String
  pub let name: String
  pub let description: String
  pub let image: MetadataViews.IPFSFile

  init(_contractName: String, _name: String, _description: String, _image: MetadataViews.IPFSFile) {
    self.contractName = _contractName
    self.name = _name
    self.description = _description
    self.image = _image
  }
}