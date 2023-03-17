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
exports.verifyTagExist = exports.verifyPostExist = exports.verifyNFTsListExist = exports.verifyCollectionListExist = exports.verifyCollectionExist = exports.verifyCollectionCategoryExist = exports.verifyCreatorExist = exports.verifyCreatorTypeExist = void 0;
const prisma_service_1 = require("../services/prisma.service");
// Verify a Creator type exist in the database
const verifyCreatorTypeExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatorTypeNameQuery = req.query.creatorTypeName;
        let creatorTypeName = creatorTypeNameQuery === null || creatorTypeNameQuery === void 0 ? void 0 : creatorTypeNameQuery.toString();
        if (!creatorTypeName)
            creatorTypeName = req.body.creatorTypeName;
        if (creatorTypeName == 'All') {
            next();
        }
        else {
            const creatorType = yield (0, prisma_service_1.findUniqueCreatorType)({ name: creatorTypeName });
            if (creatorType) {
                next();
            }
            else {
                throw new Error(`Creator Type ${creatorTypeName} not found in the Database`);
            }
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyCreatorTypeExist = verifyCreatorTypeExist;
const verifyCreatorExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatorHandleNameQuery = req.query.creatorHandleName;
        let creatorHandleName = creatorHandleNameQuery === null || creatorHandleNameQuery === void 0 ? void 0 : creatorHandleNameQuery.toString();
        if (!creatorHandleName)
            creatorHandleName = req.body.creatorHandleName;
        const creator = yield (0, prisma_service_1.findUniqueCreator)({ handleName: creatorHandleName });
        if (creator) {
            next();
        }
        else {
            throw new Error(`Creator with handle name '${creatorHandleName}' not found in the Database`);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyCreatorExist = verifyCreatorExist;
const verifyCollectionCategoryExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryNameQuery = req.query.categoryName;
        let categoryName = categoryNameQuery === null || categoryNameQuery === void 0 ? void 0 : categoryNameQuery.toString();
        if (!categoryName)
            categoryName = req.body.categoryName;
        if (categoryName == "All") {
            next();
        }
        else {
            const category = yield (0, prisma_service_1.findUniqueCategory)({ name: categoryName });
            if (category) {
                next();
            }
            else {
                throw new Error(`Collection category of ${categoryName} not found in the Database`);
            }
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyCollectionCategoryExist = verifyCollectionCategoryExist;
const verifyCollectionExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionNameQuery = req.query.collectionName;
        let collectionName = collectionNameQuery === null || collectionNameQuery === void 0 ? void 0 : collectionNameQuery.toString();
        if (!collectionName)
            collectionName = req.body.collectionName;
        const collection = yield (0, prisma_service_1.findUniqueCollection)({ name: collectionName });
        if (collection) {
            next();
        }
        else {
            throw new Error(`Collection ${collectionName} not found in the Database`);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyCollectionExist = verifyCollectionExist;
const verifyCollectionListExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listNameQuery = req.query.listName;
        let listName = listNameQuery === null || listNameQuery === void 0 ? void 0 : listNameQuery.toString();
        if (!listName)
            listName = req.body.listName;
        const list = yield (0, prisma_service_1.findUniqueCollectionList)({ name: listName });
        if (list) {
            next();
        }
        else {
            throw new Error(`Collection list of ${listName} not found in the Database`);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyCollectionListExist = verifyCollectionListExist;
const verifyNFTsListExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listNameQuery = req.query.listName;
        let listName = listNameQuery === null || listNameQuery === void 0 ? void 0 : listNameQuery.toString();
        if (!listName)
            listName = req.body.listName;
        const list = yield (0, prisma_service_1.findUniqueNFTsList)({ name: listName });
        if (list) {
            next();
        }
        else {
            throw new Error(`NFTs list of ${listName} not found in the Database`);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyNFTsListExist = verifyNFTsListExist;
const verifyPostExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.body.id;
        const post = yield (0, prisma_service_1.findUniquePost)({ id: postId });
        if (post) {
            next();
        }
        else {
            throw new Error(`Post by id:${postId} not found in the Database`);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyPostExist = verifyPostExist;
const verifyTagExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagNameQuery = req.query.tagName;
        let tagName = tagNameQuery === null || tagNameQuery === void 0 ? void 0 : tagNameQuery.toString();
        if (!tagName)
            tagName = req.body.tagName;
        const tag = yield (0, prisma_service_1.findUniqueTag)({ name: tagName });
        if (tag) {
            next();
        }
        else {
            throw new Error(`Tag by name '${tagName}' not found in the Database`);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.verifyTagExist = verifyTagExist;
