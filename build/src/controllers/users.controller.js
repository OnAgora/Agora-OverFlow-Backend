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
exports.getFeaturedPostHandler = exports.getAllPostsByTagHandler = exports.getPostByIdHandler = exports.getAllPostsHandler = exports.getAllTagsHandler = exports.getNFTsInListHandler = exports.getCollectionsInListHandler = exports.getCreatorTypesHandler = exports.getNFT_InfoHandler = exports.getNFTsForCollectionHandler = exports.getCollectionsForCategoryHandler = exports.getCollectionsForCreatorHandler = exports.getAllCategoriesHandler = exports.getCreatorsForTypeHandler = void 0;
require('dotenv').config();
const prisma_service_1 = require("../services/prisma.service");
const users_service_1 = require("../services/users.service");
// Prisma Client //
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const result = require('../response/result.js'), messages = require("../utilities/errorMessages");
//
// Find Creators for Type Handler
//
const getCreatorsForTypeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.creatorTypeName;
        const creatorTypeName = query === null || query === void 0 ? void 0 : query.toString();
        if (creatorTypeName == 'All') {
            const creators = yield (0, users_service_1.getAllCreators)();
            result.creators = creators;
            result.isError = false;
            result.message = `All creators fetched successfuly!`;
            res.send(result);
            delete result.creators;
        }
        else {
            const creators = yield (0, users_service_1.getCreatorsForType)(creatorTypeName);
            result.creators = creators;
            result.isError = false;
            result.message = `Creators of type '${req.query.creatorTypeName}' fetched successfuly!`;
            res.send(result);
            delete result.creators;
        }
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collection for category ${req.query.creatorTypeName} not found`,
                });
            }
        }
        next(err);
    }
});
exports.getCreatorsForTypeHandler = getCreatorsForTypeHandler;
//
// Find All Creators Handler
//
const getAllCategoriesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, users_service_1.getAllCollectionCategories)();
        result.isError = false;
        result.categories = categories;
        result.message = `Categories found successfully!`;
        res.send(result);
        delete result.categories;
    }
    catch (err) {
        next(err);
    }
});
exports.getAllCategoriesHandler = getAllCategoriesHandler;
//
// Find Collections for Creator Handler
//
const getCollectionsForCreatorHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.creatorHandleName;
        const creatorName = query === null || query === void 0 ? void 0 : query.toString();
        const creator = yield (0, users_service_1.getCollectionsForCreator)({ handleName: creatorName });
        result.creator = creator;
        result.isError = false;
        result.message = `${creatorName}'s collections fetched successfuly!`;
        res.send(result);
        delete result.creator;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collection for creator ${req.query.creatorHandleName} not found`,
                });
            }
        }
        next(err);
    }
});
exports.getCollectionsForCreatorHandler = getCollectionsForCreatorHandler;
//
// Find Collections for Category Handler
//
const getCollectionsForCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.categoryName;
        const categoryName = query === null || query === void 0 ? void 0 : query.toString();
        if (categoryName == 'All') {
            const collections = yield (0, users_service_1.getAllCollections)();
            result.collections = collections;
            result.isError = false;
            result.message = `All collections fetched successfuly!`;
            res.send(result);
            delete result.collections;
        }
        else {
            const collections = yield (0, users_service_1.getCollectionsForCategory)(categoryName);
            result.collections = collections;
            result.isError = false;
            result.message = `${req.query.categoryName}'s collections fetched successfuly!`;
            res.send(result);
            delete result.collections;
        }
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collection for category ${req.query.categoryName} not found`,
                });
            }
        }
        next(err);
    }
});
exports.getCollectionsForCategoryHandler = getCollectionsForCategoryHandler;
//
// Find NFTs for Collection Handler
//
const getNFTsForCollectionHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.collectionName;
        const collectionName = query === null || query === void 0 ? void 0 : query.toString();
        const collection = yield (0, users_service_1.getNFTsForCollection)({ name: collectionName });
        result.collection = collection;
        result.isError = false;
        result.message = `${collectionName}'s NFTs fetched successfuly!`;
        res.send(result);
        delete result.collection;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: `NFTs for collection ${req.query.collectionName} not found`,
                });
            }
        }
        next(err);
    }
});
exports.getNFTsForCollectionHandler = getNFTsForCollectionHandler;
//
// Find Info on one NFT handler
//
const getNFT_InfoHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.nft_id;
        const nft_id = query === null || query === void 0 ? void 0 : query.toString();
        const nft = yield (0, users_service_1.getNFT_Info)({ id: nft_id });
        result.nft = nft;
        result.isError = false;
        result.message = `NFT of id: '${nft.id}' fetched successfuly!`;
        res.send(result);
        delete result.nft;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2001') {
                return res.status(409).json({
                    status: 'fail',
                    message: `NFT of id: '${req.query.nft_id}' not found`,
                });
            }
        }
        next(err);
    }
});
exports.getNFT_InfoHandler = getNFT_InfoHandler;
//
// Get Creator Types handler
//
const getCreatorTypesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatorsTypes = yield (0, users_service_1.getAllCreatorTypes)();
        const types = creatorsTypes.map(object => {
            return object["name"];
        });
        result.creatorTypes = types;
        result.isError = false;
        result.message = "Creators types found successfully!";
        res.send(result);
        delete result.creatorTypes;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2001') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Creator types not found`,
                });
            }
        }
        next(err);
    }
});
exports.getCreatorTypesHandler = getCreatorTypesHandler;
//
// Get Collections in a List handler
//
const getCollectionsInListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.listName;
        const listName = query === null || query === void 0 ? void 0 : query.toString();
        const list = yield (0, users_service_1.getCollectionsInList)({ name: listName });
        result.collections = list === null || list === void 0 ? void 0 : list.collections;
        result.isError = false;
        result.message = `Collections of list '${listName}' found successfully!`;
        res.send(result);
        delete result.collections;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2001') {
                return res.status(409).json({
                    status: 'fail',
                    message: `List named ${req.query.listName} not found in the database`,
                });
            }
        }
        next(err);
    }
});
exports.getCollectionsInListHandler = getCollectionsInListHandler;
//
// Get NFTs in a List handler
//
const getNFTsInListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.listName;
        const listName = query === null || query === void 0 ? void 0 : query.toString();
        const list = yield (0, users_service_1.getNFTsInList)({ name: listName });
        result.nfts = list === null || list === void 0 ? void 0 : list.nfts;
        result.isError = false;
        result.message = `NFTs of list '${listName}' found successfully!`;
        res.send(result);
        delete result.nfts;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2001') {
                return res.status(409).json({
                    status: 'fail',
                    message: `List named ${req.query.listName} not found in the database`,
                });
            }
        }
        next(err);
    }
});
exports.getNFTsInListHandler = getNFTsInListHandler;
//
// Find All Tags Handler
//
const getAllTagsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield (0, users_service_1.getAllTags)();
        result.isError = false;
        result.tags = tags;
        result.message = `All Tags found successfully!`;
        res.send(result);
        delete result.tags;
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTagsHandler = getAllTagsHandler;
//
// Find All Posts Handler
//
const getAllPostsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, users_service_1.getAllPosts)();
        result.isError = false;
        result.posts = posts;
        result.message = `All Posts found successfully!`;
        res.send(result);
        delete result.posts;
    }
    catch (err) {
        next(err);
    }
});
exports.getAllPostsHandler = getAllPostsHandler;
//
// Find Featured Post Handler
//
const getPostByIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.query.postId;
        // @ts-ignore
        let postIdNumber = parseInt(postId);
        const post = yield (0, prisma_service_1.findUniquePost)({ id: postIdNumber });
        if (post) {
            result.isError = false;
            result.post = post;
            result.message = `Post of title ${post.title} found successfully!`;
            res.send(result);
            delete result.post;
        }
        else {
            result.isError = true;
            result.message = `Post by id '${req.query.postId}' doesn't exist, please use a post's id that's in the database`;
            return res.status(409).send(result);
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getPostByIdHandler = getPostByIdHandler;
//
// Find All Posts with a certain Tag Handler
//
const getAllPostsByTagHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.tagName;
        const tagName = query === null || query === void 0 ? void 0 : query.toString();
        const posts = yield (0, users_service_1.getPostsWithTag)({ name: tagName });
        result.posts = posts[0].Posts;
        result.isError = false;
        result.message = `Posts by tag '${tagName}' found successfully!`;
        res.send(result);
        delete result.posts;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2001') {
                return res.status(409).json({
                    status: 'fail',
                    message: `List named ${req.query.tagName} not found in the database`,
                });
            }
        }
        next(err);
    }
});
exports.getAllPostsByTagHandler = getAllPostsByTagHandler;
//
// Find Featured Post Handler
//
const getFeaturedPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, users_service_1.getFeaturedPost)();
        result.isError = false;
        result.post = post;
        result.message = `Featured Post found successfully!`;
        res.send(result);
        delete result.post;
    }
    catch (err) {
        next(err);
    }
});
exports.getFeaturedPostHandler = getFeaturedPostHandler;
