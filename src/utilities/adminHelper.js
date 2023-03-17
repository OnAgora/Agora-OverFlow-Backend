require("dotenv").config();
const FormData = require("form-data"),
  fs = require("fs"),
  rfs = require("recursive-fs"),
  { PrismaClient } = require('@prisma/client'),
  prisma = new PrismaClient(),
  basePathConverter = require("base-path-converter"),
  axios = require('axios'),
  path = require("path");

const { toCamelCase, removeSpace, toCapitalCamelCase } = require("./helpers/strHelpers");

// Utility function to create an array of One user Address //
const fillRecipient = (userAddress, amountToMint) => {
  let recipient = []
  for (let i = 0; i < amountToMint; i++) {
    recipient.push(userAddress)
  }
  return recipient
}

const fillNFTsItems = async (nfts_ids) => {
  const nft_items = await Promise.all(nfts_ids.map(async (id) => {

    const NFT = await prisma.NFT.findUnique({
      where: {
        id: id
      }
    })
    // Add metadataId and serial to arrays for batch_mint
    let price = NFT.price * 1000;
    let name = NFT.name;
    let serial = NFT.serial;
    let collectionName = NFT.collectionName;

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: name
        },
        unit_amount: price,
      },
      quantity: 1,
    }
  }));

  return nft_items
}

const getContractCode = async (collectionName) => {
  const { templateContractCode } = require("./consts");

  let code = templateContractCode;
  let re;

  // replace "NporiumExample" => `collectionName`
  re = /NporiumExample/g;
  code = code.replace(re, toCapitalCamelCase(collectionName));

  return code;
}

module.exports = {
  getContractCode,
  fillRecipient,
  fillNFTsItems,
};
