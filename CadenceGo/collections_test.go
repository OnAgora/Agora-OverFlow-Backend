package main

import (
	"fmt"
	"testing"

	. "github.com/bjartek/overflow"
	"github.com/fatih/color"
	"github.com/stretchr/testify/assert"
)

func TestCollection(t *testing.T) {

	o, err := OverflowTesting()
	assert.NoError(t, err)

	color.Red("Should be able to upload a batch of metadata to the contract the Collection")

	o.Tx(
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
	).AssertSuccess(t)
	color.Green("-----------------------------PASSED---------------------")

	color.Red("Should be able to fetch collection's metadata")

	Result := o.Script("/YoungApes/get_nfts_metadatas",
		WithSigner("account"),
	).Result
	fmt.Println(Result)
	color.Green("-----------------------------PASSED---------------------")

}
