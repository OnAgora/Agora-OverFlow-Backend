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

	fmt.Println("Testing StorefrontV2 Scripts and Transactions")
	fmt.Println("Press any key to continue")
	fmt.Scanln()

	/*
		Install StorefrontV2 resource
	*/
	fmt.Println("Run Transaction to setup a Storefront on Alice account")
	color.Red("Should be able to install a Storefront resource on Alice's account")
	otu.Tx(
		"./nftStorefront/setup_account",
		WithSigner("alice"),
	)
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
		List an NFT using the Storefront resource
	*/

	color.Red("Should be able to create a listing an NFT using the Storefront in Alice's account")
	otu.Tx(
		"./nftStorefront/create_listing",
		WithSigner("alice"),
		WithArg("saleItemID", "48"),
		WithArg("saleItemPrice", "0.1"),
	)
	color.Green("-----------------------------PASSED---------------------")

	/*
		Fetch the listing of one NFT using the Storefront resource
	*/

	color.Red("Should be able to fetch a listing of an NFT using the Storefront in Alice's account")
	otu.Script(
		"./nftStorefront/get_listing",
		WithSigner("bob"),
		WithArg("address", "alice"),
		WithArg("listingResourceID", "50"),
	)
	color.Green("-----------------------------PASSED---------------------")

	/*
		Buy a listed NFT using the Storefront resource
	*/

	color.Red("Should be able to buy a listed NFT using the Storefront in Bob's account")
	otu.Tx(
		"./nftStorefront/purchase_listing",
		WithSigner("bob"),
		WithArg("listingResourceID", "50"),
		WithArg("storefrontAddress", "alice"),
	)
	color.Green("-----------------------------PASSED---------------------")

}
