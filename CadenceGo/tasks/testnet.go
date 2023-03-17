package main

import (
	"fmt"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
)

func main() {

	otu := Overflow(

		WithGlobalPrintOptions(),
		WithNetwork("testnet"),
	)

	fmt.Println("Interacting with the YoungApeDiaries contract on Testnet")
	fmt.Println("Press any key to continue")
	fmt.Scanln()

	/* 	color.Red("Should be able to upload a batch of metadata to the contract the Collection")
	   	otu.Tx(
	   		"upload_metadata",
	   		WithSigner("account"),
	   		WithArg("names", `["Peer Pressure"]`),
	   		WithArg("descriptions", `["Our young friend, trying to find his way, his social tribe, his personal identity, latches on to a kaleidoscope of fashion, ideas, friends and beliefs. All of us can look back on our own uncertain days."]`),
	   		WithArg("images", `["Alex1.png"]`),
	   		WithArg("thumbnails", `["Alex1.png"]`),
	   		WithArg("prices", `[0.1]`),
	   		WithArg("extras", `[{"String": "Nporium Extra Metadata"}]`),
	   		WithArg("supplies", `[95]`),
	   		WithArg("ipfsCID", "ipfs://bafybeihkurbbjxq5v7ag62ahvatrvizmv4tqebzzm26nz6ils4nxgh5ko4"),
	   	).Print()
	   	color.Green("-----------------------------PASSED---------------------") */

	/*
		Fetch Collection's Info
	*/
	/* 	fmt.Println("Run script to check YoungApeDiaries.CollectionInfo")
	   	color.Red("Should be able to fetch the Collections' Info after deployment")
	   	scriptCollectionInfo := fmt.Sprintf(`
	   	import YoungApeDiaries from %s

	   	pub fun main() : {String: AnyStruct} {
	   		return YoungApeDiaries.getCollectionInfo()
	   	}
	   	`, otu.Address("account"))
	   	//	fmt.Println(script)

	   	otu.Script(scriptCollectionInfo).
	   		Print() */

	/* 	color.Red("Should be able to fetch NFTs metadatas")
	   	otu.Script(
	   		"./YoungApes/get_nfts_metadatas",
	   		WithSigner("account"),
	   	).Print()
	   	color.Green("-----------------------------PASSED---------------------")
	*/
	color.Red("Should be able to fetch one NFT's price")
	otu.Script(
		"./YoungApes/get_nft_price",
		WithSigner("account"),
		WithArg("metadataId", "0"),
	).Print()
	color.Green("-----------------------------PASSED---------------------")

	color.Red("Should be able to fetch the one NFT metadata")
	otu.Script(
		"./YoungApes/get_nft_info",
		WithSigner("account"),
		WithArg("metadataId", "0"),
	).Print()
	color.Green("-----------------------------PASSED---------------------")
}
