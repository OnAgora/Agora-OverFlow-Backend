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
exports.getFeaturedPost = exports.getPostsWithTag = exports.getNFTsInList = exports.getCollectionsInList = exports.getNFT_Info = exports.getNFTsForCollection = exports.getCollectionsForCategory = exports.getCollectionsForCreator = exports.getCreatorsForType = exports.getAllPosts = exports.getAllTags = exports.getAllCollectionCategories = exports.getAllCreators = exports.getAllCreatorTypes = exports.getAllCollections = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Find all Collections in an array
const getAllCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.findMany({
        select: {
            name: true,
            description: true,
            avatarUrl: true,
            address: true,
            launchDate: true,
            slug: true,
            isMinting: true,
            creator: true,
            category: true,
        }
    }));
});
exports.getAllCollections = getAllCollections;
// Return all Creator types in an array
const getAllCreatorTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.creatorType.findMany();
});
exports.getAllCreatorTypes = getAllCreatorTypes;
// Return all Creators in an array
const getAllCreators = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.creator.findMany({
        include: {
            Collections: true,
            NFTs: {
                take: 10,
            }
        }
    });
});
exports.getAllCreators = getAllCreators;
// Return all Collection Categories in an array
const getAllCollectionCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.category.findMany();
});
exports.getAllCollectionCategories = getAllCollectionCategories;
// Return all Tags in an array
const getAllTags = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tag.findMany();
});
exports.getAllTags = getAllTags;
// Return all Posts in an array
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.post.findMany({
        include: {
            tags: true
        }
    }));
});
exports.getAllPosts = getAllPosts;
// Find all Creators for a Type
const getCreatorsForType = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creator.findMany({
        where: {
            creatorType: input
        },
        include: {
            Collections: true,
            NFTs: {
                take: 10,
            }
        }
    }));
});
exports.getCreatorsForType = getCreatorsForType;
// Find all collections for a creator
const getCollectionsForCreator = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creator.findUnique({
        where: input,
        include: {
            Collections: {
                include: {
                    category: true
                }
            }
        }
    }));
});
exports.getCollectionsForCreator = getCollectionsForCreator;
// Find all collections for a category
const getCollectionsForCategory = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.findMany({
        where: {
            categoryName: input
        },
        include: {
            creator: true,
            category: true,
            CollectionList: true
        }
    }));
});
exports.getCollectionsForCategory = getCollectionsForCategory;
// Find all NFTs for a collection
const getNFTsForCollection = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.findUnique({
        where: input,
        include: {
            creator: true,
            NFTs: true
        }
    }));
});
exports.getNFTsForCollection = getNFTsForCollection;
// Find Info on One NFT
const getNFT_Info = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFT.findUnique({
        where: input
    }));
});
exports.getNFT_Info = getNFT_Info;
// Find Collections in a List
const getCollectionsInList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collectionsList.findUnique({
        where: input,
        select: {
            collections: {
                include: {
                    creator: true,
                    category: true
                }
            }
        }
    }));
});
exports.getCollectionsInList = getCollectionsInList;
// Find NFTs in a List
const getNFTsInList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFTsList.findUnique({
        where: input,
        select: {
            nfts: {
                include: {
                    creator: true,
                    collection: true,
                }
            }
        }
    }));
});
exports.getNFTsInList = getNFTsInList;
// Find Posts with a specific Tag
const getPostsWithTag = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.tag.findMany({
        where: input,
        select: {
            Posts: true
        }
    }));
});
exports.getPostsWithTag = getPostsWithTag;
// Find Posts with a specific Tag
const getFeaturedPost = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.post.findFirst({
        where: {
            featured: true
        },
        include: {
            tags: true
        }
    }));
});
exports.getFeaturedPost = getFeaturedPost;
