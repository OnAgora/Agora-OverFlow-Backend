"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTagToPostHandler = exports.createPostHandler = exports.createTagHandler = exports.addToNFTsListHandler = exports.adminBatchMintHandler = exports.toggleMintingHandler = exports.uploadMetadataHandler = exports.createNFTsListHandler = exports.createComingSoonCollectionHandler = exports.addToCollectionListHandler = exports.deployAndCreateCollectionHandler = exports.createCollectionsListHandler = exports.createCategoryHandler = exports.createCreatorHandler = exports.createCreatorTypeHandler = void 0;
require('dotenv').config();
const { result } = require('../response'), messages = require("../utilities/errorMessages"), blockchainScripts = require("../utilities/helpers/blockChainScripts"), adminHelper = require("../utilities/adminHelper");
const admin_service_1 = require("../services/admin.service");
// Prisma Client //
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//
// Create Creator Type
//
const createCreatorTypeHandler = (req, // The Request interface of ExpressJs is generic so I provided it with the inferred type of the createCreatorTypeSchema to assist Typescript to give us better IntelliSense.
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatorType = yield (0, admin_service_1.createCreatorType)({
            name: req.body.creatorTypeName
        });
        result.creatorType = creatorType;
        result.isError = false;
        result.message = `Creator type of ${req.body.creatorTypeName} was created successfuly!`;
        res.send(result);
        delete result.creatorType;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Creator type of ${req.body.creatorTypeName} already exist, please use another type name`,
                });
            }
        }
        next(err);
    }
});
exports.createCreatorTypeHandler = createCreatorTypeHandler;
//
// Create Creator
//
const createCreatorHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creator = yield (0, admin_service_1.createCreator)({
            handleName: req.body.handleName,
            name: req.body.name,
            type: {
                connect: { name: req.body.creatorTypeName },
            },
            description: req.body.description,
            avatarUrl: req.body.avatarUrl,
            bannerUrl: req.body.bannerUrl,
            body: req.body.body,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            discord: req.body.discord,
            slug: req.body.slug,
        });
        result.creator = creator;
        result.isError = false;
        result.message = `Creator of name '${req.body.name}' created successfuly!`;
        res.send(result);
        delete result.creator;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Creator of name ${req.body.name} already exist, please use another creator name`,
                });
            }
        }
        next(err);
    }
});
exports.createCreatorHandler = createCreatorHandler;
//
// Create Category
//
const createCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, admin_service_1.createCategory)({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            color: req.body.color
        });
        result.category = category;
        result.isError = false;
        result.message = `Collection category of name '${req.body.name}' created successfuly!`;
        res.send(result);
        delete result.category;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collection category of name ${req.body.name} already exist, please use another category name`,
                });
            }
        }
        next(err);
    }
});
exports.createCategoryHandler = createCategoryHandler;
//
// Create a new Collection List
//
const createCollectionsListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield (0, admin_service_1.createCollectionsList)({
            name: req.body.listName
        });
        result.list = list;
        result.isError = false;
        result.message = `Collection list of name '${req.body.listName}' created successfuly!`;
        res.send(result);
        delete result.list;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collection list of name ${req.body.listName} already exist, please use another list name`,
                });
            }
        }
        next(err);
    }
});
exports.createCollectionsListHandler = createCollectionsListHandler;
//
// Create Collection
//
const deployAndCreateCollectionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = yield adminHelper.getContractCode(req.body.collectionName);
        const txnDetails = yield blockchainScripts.deployCollection(req.body.collectionName, req.body.description, req.body.imagePath, req.body.price, req.body.ipfs, req.body.socials, req.body.startMinting, req.body.royalty, req.body.royaltyAddress, req.body.royaltyCut, code);
        if (txnDetails === "Successful") {
            // This happens if Cadence transaction is successful.
            try {
                const socials = req.body.socials;
                const twitter = socials ? socials[1].value : "undefined";
                const instagram = socials ? socials[1].value : "undefined";
                const facebook = socials ? socials[1].value : "undefined";
                const discord = socials ? socials[1].value : "undefined";
                const collection = yield (0, admin_service_1.createCollection)({
                    name: req.body.collectionName,
                    creator: {
                        connect: { handleName: req.body.creatorHandleName }
                    },
                    category: {
                        connect: { name: req.body.categoryName }
                    },
                    description: req.body.description,
                    avatarUrl: req.body.avatarUrl,
                    bannerUrl: req.body.bannerUrl,
                    videoUrl: req.body.videoUrl,
                    twitter: twitter,
                    instagram: instagram,
                    facebook: facebook,
                    discord: discord,
                    isMinting: req.body.startMinting,
                    slug: req.body.slug,
                    CollectionList: {
                        connect: { name: "Recently Listed" }
                    },
                });
                result.collection = collection;
                result.isError = false;
                result.message = `Collection of name '${req.body.collectionName}' created successfuly!`;
                res.send(result);
                delete result.collection;
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') {
                        return res.status(409).json({
                            status: 'fail',
                            message: `Collection of name ${req.body.collectionName} already exist, please use another collection name`,
                        });
                    }
                }
                next(err);
            }
        } // missing else statement?
    }
    catch (err) {
        result.isError = true;
        result.message = `cannot overwrite existing contract with name '${req.body.collectionName}' in account 0x5593df7d286bcdb8`;
        res.send(result);
    }
});
exports.deployAndCreateCollectionHandler = deployAndCreateCollectionHandler;
//
// Add to Collection List
//
const addToCollectionListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield (0, admin_service_1.addToCollectionsList)({ name: req.body.collectionName }, { name: req.body.listName });
        result.list = list;
        result.isError = false;
        result.message = `Collection '${req.body.collectionName}'  added to ${req.body.listName}!`;
        res.send(result);
        delete result.list;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collections list '${req.body.listName}' doesn't exist, please use a list's name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.addToCollectionListHandler = addToCollectionListHandler;
//
// Create a Coming Soon Collection
//
const createComingSoonCollectionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comingSoonCollection = yield (0, admin_service_1.createComingSoonCollection)({
            collectionName: req.body.collectionName,
            Creator: {
                connect: { handleName: req.body.creatorHandleName }
            },
            description: req.body.description,
            launchDate: req.body.launchDate
        });
        result.comingSoonCollection = comingSoonCollection;
        result.isError = false;
        result.message = `Coming soon col;ection of name '${req.body.collectionName}' created successfuly!`;
        res.send(result);
        delete result.comingSoonCollection;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Coming soon collection of name ${req.body.collectionName} already exist, please use another collection name`,
                });
            }
        }
        next(err);
    }
});
exports.createComingSoonCollectionHandler = createComingSoonCollectionHandler;
//
// Create a new NFTs List
//
const createNFTsListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield (0, admin_service_1.createNFTsList)({
            name: req.body.listName
        });
        result.list = list;
        result.isError = false;
        result.message = `NFTs list of name '${req.body.listName}' created successfuly!`;
        res.send(result);
        delete result.list;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `NFTs list of name ${req.body.listName} already exist, please use another list name`,
                });
            }
        }
        next(err);
    }
});
exports.createNFTsListHandler = createNFTsListHandler;
//
// Upload Metadata
//
const uploadMetadataHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txnDetails = yield blockchainScripts.upload_Metadata(req.body.collectionName, req.body.names, req.body.descriptions, req.body.images, req.body.thumbnails, req.body.prices, req.body.extras, req.body.supplies, req.body.ipfsCID);
        if (txnDetails === "Successful") {
            // This happens if Cadence transaction is successful.
            try {
                // Create array of created NFTs
                const NFTs_Created = [];
                // Run a for loop to fill this array with each NFT record created with Prisma
                for (let i = 0; i < req.body.supplies.length; i++) {
                    const serials = req.body.supplies[i];
                    for (let k = 0; k < parseInt(serials); k++) {
                        // Create 95 NFTs with different serials
                        const nft = yield (0, admin_service_1.createNFT)({
                            name: req.body.names[i],
                            description: req.body.descriptions[i],
                            metadataId: i,
                            serial: k,
                            collection: {
                                connect: { name: req.body.collectionName },
                            },
                            creator: {
                                connect: { handleName: req.body.creatorHandleName },
                            },
                            image: req.body.images[i],
                            isListed: false,
                            isMinted: false,
                            price: req.body.prices[i],
                            slug: req.body.slug,
                        });
                        NFTs_Created.push(nft);
                    }
                }
                // If everything worked
                result.cadence = txnDetails;
                result.NFTs_Created = NFTs_Created;
                result.isError = false;
                result.message = `Metadata uploading failed`;
                res.send(result);
                delete result.NFTs_Created;
                delete result.cadence;
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') {
                        return res.status(409).json({
                            status: 'fail',
                            message: `Some NFTs with these names inside the ${req.body.collectionName} collection already exist, please use another collection name or NFTs metadatada`,
                        });
                    }
                }
                next(err);
            }
        } // Maybe missing an else for Cadence error handling(?)
    }
    catch (err) {
        // Need to add more Cadence error handling here
        result.isError = true;
        result.message = err.message;
        res.send(result);
    }
});
exports.uploadMetadataHandler = uploadMetadataHandler;
//
// Collection toggle minting
//
const toggleMintingHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txnDetails = yield blockchainScripts.toggle_minting(req.body.collectionName);
        if (txnDetails === "Successful") {
            try {
                const collection = yield (0, admin_service_1.findCollection)({ name: req.body.collectionName });
                const newIsMinting = !collection.isMinting;
                const updatedCollection = yield (0, admin_service_1.toggleCollectionMinting)({ name: req.body.collectionName }, newIsMinting);
                result.updatedCollection = updatedCollection;
                result.isError = false;
                result.message = `Collection ${req.body.collectionName} has changed its minting status to: ${newIsMinting}`;
                res.status(200).send(result);
                delete result.updatedCollection;
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') {
                        return res.status(409).json({
                            status: 'fail',
                            message: `Some NFTs with these names inside the ${req.body.collectionName} collection already exist, please use another collection name or NFTs metadatada`,
                        });
                    }
                }
                next(err);
            }
        }
    }
    catch (err) {
        // Need to add more Cadence error handling here
        result.isError = true;
        result.message = err.message;
        res.send(result);
    }
});
exports.toggleMintingHandler = toggleMintingHandler;
//
// Admin Batch Mint Handler
//
const adminBatchMintHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipient = yield adminHelper.fillRecipient(req.body.userAddress, req.body.serials.length);
        const txnDetails = yield blockchainScripts.adminMint(req.body.collectionName, req.body.metadataIds, req.body.serials, recipient);
        if (txnDetails === "Successful") {
            try {
                // Update the NFTs to isMinted: true
                const updated_NFTs = [];
                for (let i = 0; i < req.body.serials.length; i++) {
                    const updated = yield (0, admin_service_1.updateIsMinted)({
                        id: req.body.nfts_Ids[i]
                    });
                    updated_NFTs.push(updated);
                }
                result.updated_nfts = updated_NFTs;
                result.isError = false;
                result.message = messages.nftMintedSuccess;
                res.status(200).send(result);
                delete result.updated_nfts;
            }
            catch (err) {
                if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2025') {
                        return res.status(409).json({
                            status: 'fail',
                            message: `Some NFTs with these names inside the ${req.body.collectionName} collection couldn't be found, please use another collection name or NFTs metadatada`,
                        });
                    }
                }
                next(err);
            }
        } // Maybe missing an else for Cadence error handling(?)
    }
    catch (err) {
        // Need to add more Cadence error handling here
        result.isError = true;
        result.message = err.message;
        res.send(result);
    }
});
exports.adminBatchMintHandler = adminBatchMintHandler;
//
// Add to NFTs List
//
const addToNFTsListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nft = yield (0, admin_service_1.addToNFTsList)({ id: req.body.nftId }, { name: req.body.listName });
        result.nft = nft;
        result.isError = false;
        result.message = `NFT of id: '${req.body.nftId}'  added to ${req.body.listName}!`;
        res.send(result);
        delete result.nft;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collections list '${req.body.listName}' doesn't exist, please use a list's name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.addToNFTsListHandler = addToNFTsListHandler;
//
// Create a new Tag
//
const createTagHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield (0, admin_service_1.createNewTag)({
            name: req.body.tagName,
            color: req.body.color
        });
        result.tag = tag;
        result.isError = false;
        result.message = `Tag of name '${req.body.tagName}' was created successfuly!`;
        res.send(result);
        delete result.tag;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Tag of name '${req.body.tagName}' already exist, please use another tag name`,
                });
            }
        }
        next(err);
    }
});
exports.createTagHandler = createTagHandler;
//
// Create a new Post
//
const createPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, admin_service_1.createNewPost)({
            title: req.body.postTitle,
            body: req.body.postBody,
            slug: req.body.postSlug,
            imageUrl: req.body.imageUrl
        });
        // Update last featured post
        let lastPostId = post.id - 1;
        if (lastPostId > 0) {
            let updatedPost = yield prisma.post.update({
                where: {
                    id: lastPostId
                },
                data: {
                    featured: false
                },
            });
        }
        result.post = post;
        result.isError = false;
        result.message = `Post of title '${req.body.postTitle}' was created successfuly!`;
        res.send(result);
        delete result.post;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Post of title '${req.body.postTitle}' already exist, please use another post title`,
                });
            }
        }
        next(err);
    }
});
exports.createPostHandler = createPostHandler;
//
// Add Tag to Post handler
//
const addTagToPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, admin_service_1.addTagToPost)({ id: req.body.postId }, { name: req.body.tagName });
        result.post = post;
        result.isError = false;
        result.message = `Tag of name '${req.body.tagName}' added to the post of title '${post.title}'`;
        res.send(result);
        delete result.post;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Post of id '${req.body.postId}' doesn't exist, please use a postId that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.addTagToPostHandler = addTagToPostHandler;
