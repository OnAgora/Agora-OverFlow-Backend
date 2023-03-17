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
exports.addTagToPost = exports.createNewPost = exports.createNewTag = exports.addToNFTsList = exports.updateIsMinted = exports.createNFT = exports.createNFTsList = exports.deleteCollectionsList = exports.toggleCollectionMinting = exports.createComingSoonCollection = exports.addToCollectionsList = exports.findCollection = exports.createCollection = exports.createCollectionsList = exports.deleteCategory = exports.createCategory = exports.deleteCreator = exports.createCreator = exports.deleteCreatorType = exports.createCreatorType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create creator type
const createCreatorType = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creatorType.create({
        data: input,
    }));
});
exports.createCreatorType = createCreatorType;
// Delete creator type
const deleteCreatorType = (uniqueInput) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creatorType.delete({
        where: uniqueInput
    }));
});
exports.deleteCreatorType = deleteCreatorType;
// Create creator
const createCreator = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creator.create({
        data: input,
    }));
});
exports.createCreator = createCreator;
// Delete creator
const deleteCreator = (uniqueInput) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creator.delete({
        where: uniqueInput
    }));
});
exports.deleteCreator = deleteCreator;
// Create category
const createCategory = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.create({
        data: input,
    }));
});
exports.createCategory = createCategory;
// Delete category
const deleteCategory = (uniqueInput) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.delete({
        where: uniqueInput
    }));
});
exports.deleteCategory = deleteCategory;
// Create collections list
const createCollectionsList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collectionsList.create({
        data: input,
    }));
});
exports.createCollectionsList = createCollectionsList;
// Create Collection
const createCollection = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.create({
        data: input,
    }));
});
exports.createCollection = createCollection;
// Find Collection
const findCollection = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.findUnique({
        where: where,
        select: {
            isMinting: true
        }
    }));
});
exports.findCollection = findCollection;
// Add to a collections list
const addToCollectionsList = (uniqueCollection, uniqueList) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.update({
        where: uniqueCollection,
        data: {
            CollectionList: {
                connect: uniqueList
            }
        }
    }));
});
exports.addToCollectionsList = addToCollectionsList;
// Create Coming Soon Collection
const createComingSoonCollection = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creatorComingSoon.create({
        data: input
    }));
});
exports.createComingSoonCollection = createComingSoonCollection;
// Collection Minting
const toggleCollectionMinting = (uniqueCollection, boolean) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.update({
        where: uniqueCollection,
        data: {
            isMinting: boolean
        }
    }));
});
exports.toggleCollectionMinting = toggleCollectionMinting;
// Delete collections list
const deleteCollectionsList = (uniqueInput) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collectionsList.delete({
        where: uniqueInput
    }));
});
exports.deleteCollectionsList = deleteCollectionsList;
// Create NFTs list
const createNFTsList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFTsList.create({
        data: input,
    }));
});
exports.createNFTsList = createNFTsList;
const createNFT = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFT.create({
        data: input,
    }));
});
exports.createNFT = createNFT;
// Update if NFT is minted
const updateIsMinted = (uniqueNFT) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFT.update({
        where: uniqueNFT,
        data: {
            isMinted: true
        }
    }));
});
exports.updateIsMinted = updateIsMinted;
// Add to a NFTs list
const addToNFTsList = (uniqueNFT, uniqueList) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFT.update({
        where: uniqueNFT,
        data: {
            List: {
                connect: uniqueList
            }
        }
    }));
});
exports.addToNFTsList = addToNFTsList;
// Create a new tag
const createNewTag = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.tag.create({
        data: input
    }));
});
exports.createNewTag = createNewTag;
// Create a new post
const createNewPost = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.post.create({
        data: input
    }));
});
exports.createNewPost = createNewPost;
// Add to a Tag to a Post
const addTagToPost = (uniquePostId, uniqueTag) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.post.update({
        where: uniquePostId,
        data: {
            tags: {
                connect: uniqueTag
            }
        }
    }));
});
exports.addTagToPost = addTagToPost;
