"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagSchema = exports.deletePostSchema = exports.deleteNFTsListSchema = exports.deleteCollectionListSchema = exports.deleteCategorySchema = exports.deleteCreatorSchema = void 0;
const zod_1 = require("zod");
exports.deleteCreatorSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Creator name is required',
            invalid_type_error: "Creator name must be a string",
        })
    }).strict()
});
exports.deleteCategorySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Category name is required',
            invalid_type_error: "Category name must be a string",
        })
    }).strict()
});
exports.deleteCollectionListSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Collection List name is required',
            invalid_type_error: "Collection List name must be a string",
        })
    }).strict()
});
exports.deleteNFTsListSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'NFTs List name is required',
            invalid_type_error: "NFTs List name must be a string",
        })
    }).strict()
});
exports.deletePostSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        id: (0, zod_1.number)({
            required_error: 'Post Id is required',
            invalid_type_error: "Post Id must be an integer",
        })
    }).strict()
});
exports.deleteTagSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        tagName: (0, zod_1.string)({
            required_error: 'Tag name is required',
            invalid_type_error: "Tag name must be a string",
        })
    }).strict()
});
