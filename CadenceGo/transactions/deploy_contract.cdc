import MetadataViews from "./standard/MetadataViews.cdc"
import FlowToken from "./standard/FlowToken.cdc"
import FungibleToken from "./standard/FungibleToken.cdc"

transaction(
  contractName: String,
  collectionName: String, // Example NFT
  description: String,
  imagePath: String,
  bannerImagePath: String?,
  price: UFix64,
  ipfsCID: String,
  // Socials
  socials: {String: String},
  // Contract Options
  minting: Bool,
  royalty: Bool,
  royaltyAddress: Address?,
  royaltyAmount: UFix64?,
  // Long Contract Code
  contractCode: String
) {

  prepare(deployer: AuthAccount) {
    /**************************************************************************************/
    /************************************* DEPLOYMENT *************************************/
    /**************************************************************************************/


    var royaltyInfo: MetadataViews.Royalty? =  nil
    if (royalty) {
        royaltyInfo = MetadataViews.Royalty(
          recepient: getAccount(royaltyAddress!).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
          cut: royaltyAmount!,
          description: "This is a royalty cut on primary sales."
        )
    }

    let socialsStruct: {String: MetadataViews.ExternalURL} = {}
    for key in socials.keys {
        socialsStruct[key] =  MetadataViews.ExternalURL(socials[key]!)
    }

    deployer.contracts.add(
      name: contractName,
      code: contractCode.decodeHex(),
      _name: collectionName,
      _description: description,
      _imagePath: imagePath,
      _bannerImagePath: bannerImagePath,
      _minting: minting,
      _royalty: royaltyInfo,
      _price: price,
      _ipfsCID: ipfsCID,
      _socials: socialsStruct,
    )
  }

}
