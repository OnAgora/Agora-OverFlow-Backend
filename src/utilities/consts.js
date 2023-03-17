// General NFT Collection Contract code used as template for many collections

// NporiumExample has to be replaced with the actual collection's name.

const templateContractCode = `
import MetadataViews from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868


pub contract NporiumExample: NonFungibleToken {

	// Collection Information
	access(self) let collectionInfo: {String: AnyStruct}

	// Contract Information
	pub var nextEditionId: UInt64
	pub var nextMetadataId: UInt64
	pub var totalSupply: UInt64

  // Events
  //
  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)
	pub event Minted(id: UInt64, recipient: Address, metadataId: UInt64)
	pub event MintBatch(metadataIds: [UInt64], recipients: [Address])
  pub event Purchase(id: UInt64, recipient: Address, metadataId: UInt64, name: String, description: String, image: MetadataViews.IPFSFile, price: UFix64)

	// Paths
	pub let CollectionStoragePath: StoragePath
	pub let CollectionPublicPath: PublicPath
	pub let CollectionPrivatePath: PrivatePath
	pub let AdministratorStoragePath: StoragePath

	// Maps metadataId of NFT to NFTMetadata
	access(account) let metadatas: {UInt64: NFTMetadata}

	// Maps the metadataId of an NFT to the primary buyer
	//
	// You can also get a list of purchased NFTs
	// by doing "primaryBuyers.keys"
	access(account) let primaryBuyers: {Address: {UInt64: [UInt64]}}

	access(account) let nftStorage: @{Address: {UInt64: NFT}}

	pub struct NFTMetadata {
		pub let metadataId: UInt64
		pub let name: String
		pub let description: String
		// The main image of the NFT
		pub let image: MetadataViews.IPFSFile
		// An optional thumbnail that can go along with it
		// for easier loading
		pub let thumbnail: MetadataViews.IPFSFile?
		// If price is nil, defaults to the collection price
		pub let price: UFix64?
		pub var extra: {String: AnyStruct}
		pub let supply: UInt64
		pub let purchasers: {UInt64: Address}

		access(account) fun purchased(serial: UInt64, buyer: Address) {
			self.purchasers[serial] = buyer
		}

		init(_name: String, _description: String, _image: MetadataViews.IPFSFile, _thumbnail: MetadataViews.IPFSFile?, _price: UFix64?, _extra: {String: AnyStruct}, _supply: UInt64) {
			self.metadataId = NporiumExample.nextMetadataId
			self.name = _name
			self.description = _description
			self.image = _image
			self.thumbnail = _thumbnail
			self.price = _price
			self.extra = _extra
			self.supply = _supply
			self.purchasers = {}
		}
	}

	pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
		// The 'id' is the same as the 'uuid'
		pub let id: UInt64
		// The 'metadataId' is what maps this NFT to its 'NFTMetadata'
		pub let metadataId: UInt64
		pub let serial: UInt64

		pub fun getMetadata(): NFTMetadata {
			return NporiumExample.getNFTMetadata(self.metadataId)!
		}

		pub fun getViews(): [Type] {
			return [
				Type<MetadataViews.Display>(),
				Type<MetadataViews.ExternalURL>(),
				Type<MetadataViews.NFTCollectionData>(),
				Type<MetadataViews.NFTCollectionDisplay>(),
				Type<MetadataViews.Royalties>(),
				Type<MetadataViews.Serial>(),
				Type<MetadataViews.Traits>(),
				Type<MetadataViews.NFTView>()
			]
		}

		pub fun resolveView(_ view: Type): AnyStruct? {
			switch view {
				case Type<MetadataViews.Display>():
					let metadata = self.getMetadata()
					return MetadataViews.Display(
						name: metadata.name,
						description: metadata.description,
						thumbnail: metadata.thumbnail ?? metadata.image
					)
				case Type<MetadataViews.NFTCollectionData>():
					return MetadataViews.NFTCollectionData(
						storagePath: NporiumExample.CollectionStoragePath,
						publicPath: NporiumExample.CollectionPublicPath,
						providerPath: NporiumExample.CollectionPrivatePath,
						publicCollection: Type<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(),
						publicLinkedType: Type<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(),
						providerLinkedType: Type<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection, NonFungibleToken.Provider}>(),
						createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
								return <- NporiumExample.createEmptyCollection()
						})
					)
        case Type<MetadataViews.ExternalURL>():
          return MetadataViews.ExternalURL("https://nporium.com")
        case Type<MetadataViews.NFTCollectionDisplay>():
          let squareMedia = MetadataViews.Media(
            file: NporiumExample.getCollectionAttribute(key: "image") as! MetadataViews.IPFSFile,
            mediaType: "image"
          )

					// If a banner image exists, use it
					// Otherwise, default to the main square image
					var bannerMedia: MetadataViews.Media? = nil
					if let bannerImage = NporiumExample.getOptionalCollectionAttribute(key: "bannerImage") as! MetadataViews.IPFSFile? {
						bannerMedia = MetadataViews.Media(
							file: bannerImage,
							mediaType: "image"
						)
					}
        return MetadataViews.NFTCollectionDisplay(
          name: NporiumExample.getCollectionAttribute(key: "name") as! String,
          description: NporiumExample.getCollectionAttribute(key: "description") as! String,
          externalURL: MetadataViews.ExternalURL("https://nporium.com"),
          squareImage: squareMedia,
          bannerImage: bannerMedia ?? squareMedia,
          socials: NporiumExample.getCollectionAttribute(key: "socials") as! {String: MetadataViews.ExternalURL}
        )
        case Type<MetadataViews.Royalties>():
          return MetadataViews.Royalties([
            MetadataViews.Royalty( // This is my own Blotco address
              recepient: getAccount(0x3e12c78b53d052cd).getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver),
              cut: 0.1, // 10% royalty on secondary sales
              description: "Whatever account we set will receive this amount of royalty on secundary sales"
            )
          ])
				case Type<MetadataViews.Serial>():
					return MetadataViews.Serial(
						self.serial
					)
				case Type<MetadataViews.Traits>():
					return MetadataViews.dictToTraits(dict: self.getMetadata().extra, excludedNames: nil)
				case Type<MetadataViews.NFTView>():
					return MetadataViews.NFTView(
						id: self.id,
						uuid: self.uuid,
						display: self.resolveView(Type<MetadataViews.Display>()) as! MetadataViews.Display?,
						externalURL: self.resolveView(Type<MetadataViews.ExternalURL>()) as! MetadataViews.ExternalURL?,
						collectionData: self.resolveView(Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?,
						collectionDisplay: self.resolveView(Type<MetadataViews.NFTCollectionDisplay>()) as! MetadataViews.NFTCollectionDisplay?,
						royalties: self.resolveView(Type<MetadataViews.Royalties>()) as! MetadataViews.Royalties?,
						traits: self.resolveView(Type<MetadataViews.Traits>()) as! MetadataViews.Traits?
					)
			}
			return nil
		}

		init(_metadataId: UInt64, _serial: UInt64, _recipient: Address) {
			pre {
				NporiumExample.metadatas[_metadataId] != nil:
					"This NFT does not exist yet."
				_serial < NporiumExample.getNFTMetadata(_metadataId)!.supply:
					"This serial does not exist for this metadataId."
				!NporiumExample.getNFTMetadata(_metadataId)!.purchasers.containsKey(_serial):
					"This serial has already been purchased."
			}
			self.id = self.uuid
			self.metadataId = _metadataId
			self.serial = _serial

			// Update the buyers list so we keep track of who is purchasing
			if let buyersRef = &NporiumExample.primaryBuyers[_recipient] as &{UInt64: [UInt64]}? {
				if let metadataIdMap = &buyersRef[_metadataId] as &[UInt64]? {
					metadataIdMap.append(_serial)
				} else {
					buyersRef[_metadataId] = [_serial]
				}
			} else {
				NporiumExample.primaryBuyers[_recipient] = {_metadataId: [_serial]}
			}

			// Update who bought this serial inside NFTMetadata so it cannot be purchased again.
			let metadataRef = (&NporiumExample.metadatas[_metadataId] as &NFTMetadata?)!
			metadataRef.purchased(serial: _serial, buyer: _recipient)

			NporiumExample.totalSupply = NporiumExample.totalSupply + 1
			emit Minted(id: self.id, recipient: _recipient, metadataId: _metadataId)
		}
	}

	pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
		// dictionary of NFT conforming tokens
		// NFT is a resource type with an 'UInt64' ID field
		pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

		// withdraw removes an NFT from the collection and moves it to the caller
		pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
			let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

			emit Withdraw(id: token.id, from: self.owner?.address)

			return <-token
		}

		// deposit takes a NFT and adds it to the collections dictionary
		// and adds the ID to the id array
		pub fun deposit(token: @NonFungibleToken.NFT) {
			let token <- token as! @NFT

			let id: UInt64 = token.id

			// add the new token to the dictionary
			self.ownedNFTs[id] <-! token

			emit Deposit(id: id, to: self.owner?.address)
		}

		// getIDs returns an array of the IDs that are in the collection
		pub fun getIDs(): [UInt64] {
			return self.ownedNFTs.keys
		}

		// borrowNFT gets a reference to an NFT in the collection
		// so that the caller can read its metadata and call its methods
		pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
			return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
		}

		pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
			let token = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
			let nft = token as! &NFT
			return nft as &AnyResource{MetadataViews.Resolver}
		}

		pub fun claim() {
			if let storage = &NporiumExample.nftStorage[self.owner!.address] as &{UInt64: NFT}? {
				for id in storage.keys {
					self.deposit(token: <- storage.remove(key: id)!)
				}
			}
		}

		init () {
			self.ownedNFTs <- {}
		}

		destroy() {
			destroy self.ownedNFTs
		}
	}

	// A function to mint NFTs.
	// You can only call this function if minting
	// is currently active.
	pub fun mintNFT(metadataId: UInt64, recipient: &{NonFungibleToken.Receiver}, payment: @FlowToken.Vault, serial: UInt64): UInt64 {
		pre {
			//self.canMint(): "Minting is currently closed by the Administrator!" --Let's disable this for testing purposes--
			payment.balance == self.getPriceOfNFT(metadataId):
				"Payment does not match the price. You passed in ".concat(payment.balance.toString()).concat(" but this NFT costs ").concat(self.getPriceOfNFT(metadataId)!.toString())
		}
		let price: UFix64 = self.getPriceOfNFT(metadataId)!

		// Handle royalty to user that was configured upon creation
		if let royalty = NporiumExample.getOptionalCollectionAttribute(key: "royalty") as! MetadataViews.Royalty? {
			royalty.receiver.borrow()!.deposit(from: <- payment.withdraw(amount: price * royalty.cut))
		}

		// Give the rest to the collection owner
		let paymentRecipient = self.account.getCapability(/public/flowTokenReceiver)
								.borrow<&FlowToken.Vault{FungibleToken.Receiver}>()!
		paymentRecipient.deposit(from: <- payment)

		// Mint the nft
		let nft <- create NFT(_metadataId: metadataId, _serial: serial, _recipient: recipient.owner!.address)
		let nftId: UInt64 = nft.id
		let metadata = self.getNFTMetadata(metadataId)!
		self.collectionInfo["profit"] = (self.getCollectionAttribute(key: "profit") as! UFix64) + price

		// Emit event
		emit Purchase(id: nftId, recipient: recipient.owner!.address, metadataId: metadataId, name: metadata.name, description: metadata.description, image: metadata.image, price: price)

		// Deposit nft
		recipient.deposit(token: <- nft)

		return nftId
	}

	pub resource Administrator {
		pub fun createNFTMetadata(name: String, description: String, imagePath: String, thumbnailPath: String?, ipfsCID: String, price: UFix64?, extra: {String: AnyStruct}, supply: UInt64) {
			NporiumExample.metadatas[NporiumExample.nextMetadataId] = NFTMetadata(
				_name: name,
				_description: description,
				_image: MetadataViews.IPFSFile(
					cid: ipfsCID,
					path: imagePath
				),
				_thumbnail: thumbnailPath == nil ? nil : MetadataViews.IPFSFile(cid: ipfsCID, path: thumbnailPath),
				_price: price,
				_extra: extra,
				_supply: supply
			)
			NporiumExample.nextMetadataId = NporiumExample.nextMetadataId + 1
		}

		// mintNFT mints a new NFT and deposits
		// it in the recipients collection
		pub fun mintNFT(metadataId: UInt64, serial: UInt64, recipient: Address) {

			let nft <- create NFT(_metadataId: metadataId, _serial: serial, _recipient: recipient)
			if let recipientCollection = getAccount(recipient).getCapability(NporiumExample.CollectionPublicPath).borrow<&NporiumExample.Collection{NonFungibleToken.CollectionPublic}>() {
				recipientCollection.deposit(token: <- nft)
			} else {
				if let storage = &NporiumExample.nftStorage[recipient] as &{UInt64: NFT}? {
					storage[nft.id] <-! nft
				} else {
					NporiumExample.nftStorage[recipient] <-! {nft.id: <- nft}
				}
			}
		}

		pub fun mintBatch(metadataIds: [UInt64], serials: [UInt64], recipients: [Address]) {
			pre {
				metadataIds.length == recipients.length: "You need to pass in an equal number of metadataIds and recipients."
			}
			var i = 0
			while i < metadataIds.length {
				self.mintNFT(metadataId: metadataIds[i], serial: serials[i], recipient: recipients[i])
				i = i + 1
			}

			emit MintBatch(metadataIds: metadataIds, recipients: recipients)
		}

		// create a new Administrator resource
		pub fun createAdmin(): @Administrator {
			return <- create Administrator()
		}

		// change piece of collection info
		pub fun changeField(key: String, value: AnyStruct) {
			NporiumExample.collectionInfo[key] = value
		}
	}

	// public function that anyone can call to create a new empty collection
	pub fun createEmptyCollection(): @NonFungibleToken.Collection {
		return <- create Collection()
	}

	// Get information about a NFTMetadata
	pub fun getNFTMetadata(_ metadataId: UInt64): NFTMetadata? {
		return self.metadatas[metadataId]
	}

	pub fun getNFTMetadatas(): {UInt64: NFTMetadata} {
		return self.metadatas
	}

	pub fun getPrimaryBuyers(): {Address: {UInt64: [UInt64]}} {
		return self.primaryBuyers
	}

	pub fun getCollectionInfo(): {String: AnyStruct} {
		let collectionInfo = self.collectionInfo
		collectionInfo["metadatas"] = self.metadatas
		collectionInfo["primaryBuyers"] = self.primaryBuyers
		collectionInfo["totalSupply"] = self.totalSupply
		collectionInfo["nextMetadataId"] = self.nextMetadataId
		collectionInfo["version"] = 1
		return collectionInfo
	}

	pub fun getCollectionAttribute(key: String): AnyStruct {
		return self.collectionInfo[key] ?? panic(key.concat(" is not an attribute in this collection."))
	}

	pub fun getOptionalCollectionAttribute(key: String): AnyStruct? {
		return self.collectionInfo[key]
	}

	pub fun canMint(): Bool {
		return self.getCollectionAttribute(key: "minting") as! Bool
	}

	// Returns nil if an NFT with this metadataId doesn't exist
	pub fun getPriceOfNFT(_ metadataId: UInt64): UFix64? {
		if let metadata: NporiumExample.NFTMetadata = self.getNFTMetadata(metadataId) {
			let defaultPrice: UFix64 = self.getCollectionAttribute(key: "price") as! UFix64
			return metadata.price ?? defaultPrice
		}
		// If the metadataId doesn't exist
		return nil
	}

	// Returns an mapping of "id" to NFTMetadata
	// for the NFTs a user can claim
	pub fun getClaimableNFTs(user: Address): {UInt64: NFTMetadata} {
		let answer: {UInt64: NFTMetadata} = {}
		if let storage = &NporiumExample.nftStorage[user] as &{UInt64: NFT}? {
			for id in storage.keys {
				let nftRef = (&storage[id] as &NFT?)!
				answer[id] = self.getNFTMetadata(nftRef.metadataId)
			}
		}
		return answer
	}

	init(
		_name: String,
		_description: String,
		_imagePath: String,
		_bannerImagePath: String?,
		_minting: Bool,
		_royalty: MetadataViews.Royalty?,
		_defaultPrice: UFix64,
		_ipfsCID: String,
		_socials: {String: MetadataViews.ExternalURL},
	) {
		// Collection Info
		self.collectionInfo = {}
		self.collectionInfo["name"] = _name
		self.collectionInfo["description"] = _description
		self.collectionInfo["image"] = MetadataViews.IPFSFile(
			cid: _ipfsCID,
			path: _imagePath
		)
		if let bannerImagePath = _bannerImagePath {
			self.collectionInfo["bannerImage"] = MetadataViews.IPFSFile(
				cid: _ipfsCID,
				path: _bannerImagePath
			)
		}
    self.collectionInfo["ipfsCID"] = _ipfsCID
    self.collectionInfo["socials"] = _socials
    self.collectionInfo["minting"] = _minting
    if let royalty = _royalty {
			assert(royalty.receiver.check(), message: "The passed in royalty receiver is not valid. The royalty account must set up the intended payment token.")
			self.collectionInfo["royalty"] = royalty
    }
    self.collectionInfo["price"] = _defaultPrice
    self.collectionInfo["dateCreated"] = getCurrentBlock().timestamp
    self.collectionInfo["profit"] = 0.0

		self.nextEditionId = 0
		self.nextMetadataId = 0
		self.totalSupply = 0
		self.metadatas = {}
		self.primaryBuyers = {}
		self.nftStorage <- {}

		// Set the named paths
		// We include the user's address in the paths.
		// This is to prevent clashing with existing
		// Collection paths in the ecosystem.
		self.CollectionStoragePath = /storage/NporiumExampleCollection_UserAddress
		self.CollectionPublicPath = /public/NporiumExampleCollection_UserAddress
		self.CollectionPrivatePath = /private/NporiumExampleCollection_UserAddress
		self.AdministratorStoragePath = /storage/NporiumExampleAdministrator_UserAddress

		// Create a Collection resource and save it to storage
		let collection <- create Collection()
		self.account.save(<- collection, to: self.CollectionStoragePath)

		// create a public capability for the collection
		self.account.link<&Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(
			self.CollectionPublicPath,
			target: self.CollectionStoragePath
		)

		// Create a Administrator resource and save it to storage
		let administrator <- create Administrator()
		self.account.save(<- administrator, to: self.AdministratorStoragePath)

		emit ContractInitialized()
	}
}
`;

const deployerTransactionCode = `
import MetadataViews from 0x631e88ae7f1d7c20
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

transaction(
	contractName: String,
	collectionName: String,
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
`
	;

module.exports = {
	templateContractCode,
	deployerTransactionCode
}