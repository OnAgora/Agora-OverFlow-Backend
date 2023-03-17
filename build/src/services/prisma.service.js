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
exports.findUniqueTag = exports.findUniquePost = exports.findUniqueNFTsList = exports.findUniqueCollectionList = exports.findUniqueCollection = exports.findUniqueCategory = exports.findUniqueCreator = exports.findUniqueCreatorType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Find unique creatorType
const findUniqueCreatorType = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creatorType.findUnique({
        where: input
    }));
});
exports.findUniqueCreatorType = findUniqueCreatorType;
// Find unique Creator
const findUniqueCreator = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.creator.findUnique({
        where: input
    }));
});
exports.findUniqueCreator = findUniqueCreator;
// Find unique Category
const findUniqueCategory = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.category.findUnique({
        where: input
    }));
});
exports.findUniqueCategory = findUniqueCategory;
// Find unique Category
const findUniqueCollection = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collection.findUnique({
        where: input
    }));
});
exports.findUniqueCollection = findUniqueCollection;
// Find unique Collection List
const findUniqueCollectionList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.collectionsList.findUnique({
        where: input
    }));
});
exports.findUniqueCollectionList = findUniqueCollectionList;
// Find unique NFTs List
const findUniqueNFTsList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.nFTsList.findUnique({
        where: input
    }));
});
exports.findUniqueNFTsList = findUniqueNFTsList;
// Find unique Post
const findUniquePost = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.post.findUnique({
        where: input
    }));
});
exports.findUniquePost = findUniquePost;
// Find unique Tag
const findUniqueTag = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield prisma.tag.findUnique({
        where: input
    }));
});
exports.findUniqueTag = findUniqueTag;
