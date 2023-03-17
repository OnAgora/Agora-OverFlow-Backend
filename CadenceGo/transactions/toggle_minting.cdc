import YoungApeDiaries from "../contracts/YoungApeDiaries.cdc"

transaction() {
  let Administrator: &YoungApeDiaries.Administrator
  prepare(deployer: AuthAccount) {
    self.Administrator = deployer.borrow<&YoungApeDiaries.Administrator>(from: YoungApeDiaries.AdministratorStoragePath)
                          ?? panic("This account has not deployed the contract.")
  }

  execute {
    self.Administrator.changeField(key: "minting", value: !(YoungApeDiaries.getCollectionAttribute(key: "minting") as! Bool))
  }
}