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
exports.deleteTagHandler = exports.deletePostHandler = exports.deleteNFTsListHandler = exports.deleteCollectionsListHandler = exports.deleteCategoryHandler = exports.deleteCreatorHandler = exports.deleteCreatorTypeHandler = void 0;
const { result } = require('../response');
const client_1 = require("@prisma/client");
const admin_service_1 = require("../services/admin.service");
const delete_service_1 = require("../services/delete.service");
//
// Delete Creator Type
//
const deleteCreatorTypeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.body.creatorTypeName;
        const creatorType = yield (0, admin_service_1.deleteCreatorType)({
            name: type
        });
        result.creatorType = creatorType;
        result.isError = false;
        result.message = `Creator type of ${type} deleted successfully!`;
        res.send(result);
        delete result.creatorType;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Creator type of ${req.body.creatorTypeName} doesn't exist, please use a type name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deleteCreatorTypeHandler = deleteCreatorTypeHandler;
//
// Delete Creator
//
const deleteCreatorHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const creator = yield (0, admin_service_1.deleteCreator)({
            name: name
        });
        result.creator = creator;
        result.isError = false;
        result.message = `Creator of name '${name}' deleted successfuly!`;
        res.send(result);
        delete result.creator;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Creator '${req.body.name}' doesn't exist, please use a creator's name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deleteCreatorHandler = deleteCreatorHandler;
//
// Delete Collection Category
//
const deleteCategoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const category = yield (0, admin_service_1.deleteCategory)({
            name: name
        });
        result.category = category;
        result.isError = false;
        result.message = `Category of name '${name}' deleted successfuly!`;
        res.send(result);
        delete result.category;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Category '${req.body.name}' doesn't exist, please use a category's name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deleteCategoryHandler = deleteCategoryHandler;
//
// Delete Collection List
//
const deleteCollectionsListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const list = yield (0, admin_service_1.deleteCollectionsList)({ name: name });
        result.list = list;
        result.isError = false;
        result.message = `Collections list of name '${name}' deleted successfuly!`;
        res.send(result);
        delete result.list;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collections list '${req.body.name}' doesn't exist, please use a list's name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deleteCollectionsListHandler = deleteCollectionsListHandler;
//
// Delete NFTs List
//
const deleteNFTsListHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const list = yield (0, admin_service_1.deleteCollectionsList)({
            name: name
        });
        result.list = list;
        result.isError = false;
        result.message = `Collections list of name '${name}' deleted successfuly!`;
        res.send(result);
        delete result.list;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Collections list '${req.body.name}' doesn't exist, please use a list's name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deleteNFTsListHandler = deleteNFTsListHandler;
//
// Delete Post by id Handler
//
const deletePostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.body.id;
        const post = yield (0, delete_service_1.deletePost)({ id: postId });
        result.post = post;
        result.isError = false;
        result.message = `Post of title '${post.title}' deleted successfuly!`;
        res.send(result);
        delete result.post;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Post with id '${req.body.id}' doesn't exist, please use a post id that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deletePostHandler = deletePostHandler;
//
// Delete Tag by name Handler
//
const deleteTagHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagName = req.body.tagName;
        const tag = yield (0, delete_service_1.deleteTag)({ name: tagName });
        result.tag = tag;
        result.isError = false;
        result.message = `Tag of name '${tag.name}' deleted successfuly!`;
        res.send(result);
        delete result.tag;
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json({
                    status: 'fail',
                    message: `Tag with name '${req.body.tagName}' doesn't exist, please use a tag name that's in the database`
                });
            }
        }
        next(err);
    }
});
exports.deleteTagHandler = deleteTagHandler;
/* const deleteTag = async (req, res) => {
  try {
    const tagName = req.body.tagName
    const tag = await prisma.Tag.delete({
      where: {
        name: tagName,
      }
    })
    result.isError = false;
    result.message = `The tag ${tagName} has been deleted successfully!`;
    res.status(200).send(result);
    delete result.tag
  } catch (error) {
    result.isError = true;
    if (error.message) {
      result.message = error.message;
    } else {
      result.message = error;
    }
    res.status(400).send(result);
  }
}


const deletePost = async (req, res) => {
  try {
    const postId = req.body.postId
    const Post = await prisma.Post.delete({
      where: {
        id: postId
      },
    })
    result.isError = false;
    result.message = `The Post ${postTitle} has been deleted successfully!`;
    res.status(200).send(result);
  } catch (error) {
    result.isError = true;
    if (error.message) {
      result.message = error.message;
    } else {
      result.message = error;
    }
    res.status(400).send(result);
  }
}

*/ 
