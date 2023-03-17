"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByIdSchema = exports.getAllPostsByTagSchema = exports.getNFTsListSchema = exports.getCollectionListSchema = exports.getOneNFTInfoSchema = exports.getNFTsForOneCollectionSchema = exports.getCollectionsForCategorySchema = exports.findCollectionsForCreatorSchema = exports.getCreatorsForTypeSchema = void 0;
const zod_1 = require("zod");
// Find Creators for Type schema
exports.getCreatorsForTypeSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        creatorTypeName: (0, zod_1.string)({
            required_error: 'Type name is required',
            invalid_type_error: "Type name must be a string",
        })
    }).strict()
});
// Find collections for Creator schema
exports.findCollectionsForCreatorSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        creatorHandleName: (0, zod_1.string)({
            required_error: 'Creator Handle name is required',
            invalid_type_error: "Creator Handle name must be a string",
        })
            .min(3, 'Creator Handle name must be more than 2 characters')
    }).strict()
});
// Find collections for Category schema
exports.getCollectionsForCategorySchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        categoryName: (0, zod_1.string)({
            required_error: 'Category name is required',
            invalid_type_error: "Category name must be a string",
        })
    }).strict()
});
// Find NFTs for one Collection schema
exports.getNFTsForOneCollectionSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string",
        })
    }).strict()
});
// Find one NFT info schema
exports.getOneNFTInfoSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        nft_id: (0, zod_1.string)({
            required_error: 'NFT Id is required',
            invalid_type_error: "NFT Id must be a string",
        })
    }).strict()
});
exports.getCollectionListSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        listName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
            .min(5, 'List name must be more than 4 characters')
    }).strict()
});
exports.getNFTsListSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        listName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
            .min(5, 'List name must be more than 4 characters')
    }).strict()
});
exports.getAllPostsByTagSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        tagName: (0, zod_1.string)({
            required_error: 'Tag name is required',
            invalid_type_error: "Tag name must be a string",
        })
    }).strict()
});
exports.getPostByIdSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        postId: (0, zod_1.string)({
            required_error: 'Post Id is required',
            invalid_type_error: "Post Id must be a string",
        })
    }).strict()
});
