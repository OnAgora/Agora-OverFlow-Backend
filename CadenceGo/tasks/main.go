package main

import (
	"fmt"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
)

func main() {

	otu := Overflow(

		WithGlobalPrintOptions(),
	)

	fmt.Println("Deploying contract with this 10 Args")
	fmt.Println("Press any key to continue")
	fmt.Scanln()

	/*
		Fetch Collection's Info
	*/
	fmt.Println("Run script to check YoungApeDiaries.CollectionInfo")
	color.Red("Should be able to fetch the Collections' Info after deployment")
	scriptCollectionInfo := fmt.Sprintf(`
	import YoungApeDiaries from %s

	pub fun main() : {String: AnyStruct} {
		return YoungApeDiaries.getCollectionInfo()
	}
	`, otu.Address("account"))
	//	fmt.Println(script)

	otu.Script(scriptCollectionInfo).
		Print()

	/*
		Fetch Collection's totalSupply which is the amount of
		minted NFTs
	*/
	scriptTotalSupply := fmt.Sprintf(`
	import YoungApeDiaries from %s

	pub fun main() : UInt64 {
		return YoungApeDiaries.totalSupply
	}
	`, otu.Address("account"))
	//fmt.Println(scriptTotalSupply)

	color.Red("The Total Supply Should be 0 after deployment")
	otu.Script(scriptTotalSupply)

	color.Green("-----------------------------PASSED---------------------")
	color.Red("Should be able to upload a batch of metadata to the contract the Collection")
	otu.Tx(
		"upload_metadata",
		WithSigner("account"),
		WithArg("names", `["First", "Second", "Third", "Fourth"]`),
		WithArg("descriptions", `["First NFT", "Second NFT", "Third NFT", "Fourth NFT"]`),
		WithArg("images", `["FirstIMG", "SecondIMG", "ThirdIMG", "FourthIMG"]`),
		WithArg("thumbnails", `["FirstThumbnail", "SecondThumbnail", "ThirdThumbnail", "FourthThumbnail"]`),
		WithArg("prices", `[0.1, 0.1, 0.1, 0.1]`),
		WithArg("extras", `[{"String": "Extra1"}, {"String": "Extra2"}, {"String": "Extra3"}, {"String": "Extra4"}]`),
		WithArg("supplies", `[95, 95, 95, 95]`),
		WithArg("ipfsCID", "ipfs://bafybeihkurbbjxq5v7ag62ahvatrvizmv4tqebzzm26nz6ils4nxgh5ko4"),
	)
	color.Green("-----------------------------PASSED---------------------")

	/*
		Setup an account to hold a Young Ape Diary NFT.
	*/
	color.Red("Should be able to setup Alice's account with an empty NFT Collection")
	otu.Tx("setup_account", WithSigner("alice"))
	color.Green("-----------------------------PASSED---------------------")

	/*
		Mint a Young Ape Diary NFT on signer's account.
	*/
	color.Red("Should be able to mint a YoungApeDiary NFT inside Alice's collection")
	otu.Tx(
		"mint_youngApeDiary",
		WithSigner("alice"),
		WithArg("metadataId", "0"),
		WithArg("price", "0.1"),
		WithArg("_serial", "0"),
	)
	color.Green("-----------------------------PASSED---------------------")

	/*
		Transfer a Young Ape Diary NFT from signer's account to Bob's.
	*/
	color.Red("Should be able to transfer a YoungApeDiary NFT from Alice's to Bob")
	otu.Tx("setup_account", WithSigner("bob"))
	otu.Tx(
		"transfer_youngApeDiary",
		WithSigner("alice"),
		WithArg("recipient", "bob"),
		WithArg("withdrawID", "46"),
	)
	color.Green("-----------------------------PASSED---------------------")

	color.Red("Should be able to batchMint 3 YoungApeDiary NFTs inside Alice's collection from the Administrator")
	otu.Tx(
		"admin_batch_mint",
		WithSigner("account"),
		WithArg("_metadataIds", "[1, 2, 3]"),
		WithArg("_serials", "[1, 2, 3]"),
		WithAddresses("_recipients", "account", "account", "account"),
	)
	color.Green("-----------------------------PASSED---------------------")

	color.Red("Should be able to fetch the collection's Display data")
	otu.Script(
		"./YoungApes/get_collection_displays",
		WithSigner("account"),
	)
	color.Green("-----------------------------PASSED---------------------")

	color.Red("Should be able to fetch the one NFT metadata")
	otu.Script(
		"./YoungApes/get_nft_info",
		WithSigner("account"),
		WithArg("metadataId", "0"),
	).Print()
	color.Green("-----------------------------PASSED---------------------")
}
