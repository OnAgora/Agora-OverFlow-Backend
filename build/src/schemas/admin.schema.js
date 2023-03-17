"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMintingSchema = exports.batchMintSchema = exports.uploadMetadataToCollectionSchema = exports.deployCollectionSchema = exports.addNewTagToPostSchema = exports.createNewPostSchema = exports.createNewTagSchema = exports.createComingSoonCollectionSchema = exports.addNFTtoListSchema = exports.createNewNFTsListSchema = exports.addCollectionToListSchema = exports.createNewCollectionsListSchema = exports.createCategorySchema = exports.createCreatorSchema = exports.createCreatorTypeSchema = void 0;
const zod_1 = require("zod");
exports.createCreatorTypeSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        creatorTypeName: (0, zod_1.string)({
            required_error: 'Creator Type name is required',
            invalid_type_error: "Creator Type name must be a string",
        })
            .min(3, 'Type must be more than 2 characters')
    }).strict()
});
exports.createCreatorSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        handleName: (0, zod_1.string)({
            required_error: 'HandleName is required',
            invalid_type_error: "HandleName must be a string",
        }),
        name: (0, zod_1.string)({
            required_error: 'Creator name is required',
            invalid_type_error: "Creator name must be a string",
        }),
        creatorTypeName: (0, zod_1.string)({
            required_error: 'Creator type is required',
            invalid_type_error: "Creator type must be a string",
        }),
        description: (0, zod_1.string)({
            required_error: 'Description is required',
            invalid_type_error: "Description must be a string",
        })
            .min(25, 'Description must have at least 25 characters'),
        avatarUrl: (0, zod_1.string)({
            required_error: 'Avatar URL is required',
            invalid_type_error: "Avatar URL must be a string",
        }).url(),
        bannerUrl: (0, zod_1.string)({
            required_error: 'Banner URL is required',
            invalid_type_error: "Banner URL must be a string",
        }).url(),
        body: (0, zod_1.string)({
            required_error: 'Path to body is required',
            invalid_type_error: "Path must be a string",
        }),
        twitter: (0, zod_1.string)().url().nullable().optional(),
        instagram: (0, zod_1.string)().url().nullable().optional(),
        facebook: (0, zod_1.string)().url().nullable().optional(),
        discord: (0, zod_1.string)().url().nullable().optional(),
        slug: (0, zod_1.string)({
            required_error: 'Slug URL is required',
            invalid_type_error: "Slug URL must be a string",
        })
    }).strict()
});
exports.createCategorySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
            invalid_type_error: "Name must be a string",
        }),
        imageUrl: (0, zod_1.string)({
            required_error: 'ImageUrl is required',
            invalid_type_error: "ImageUrl must be a string",
        }).url(),
        color: (0, zod_1.string)({
            required_error: 'Color is required',
            invalid_type_error: "Color must be a string",
        })
    }).strict()
});
exports.createNewCollectionsListSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        listName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
            .min(5, 'List name must be more than 4 characters')
    }).strict()
});
exports.addCollectionToListSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string"
        }),
        listName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
    })
});
exports.createNewNFTsListSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        listName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
            .min(5, 'List name must be more than 4 characters')
    }).strict()
});
exports.addNFTtoListSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        listName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
            .min(5, 'List name must be more than 4 characters'),
        nftId: (0, zod_1.string)({
            required_error: 'nft ID is required',
            invalid_type_error: "NFT Id must be a string",
        })
    }).strict()
});
exports.createComingSoonCollectionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string",
        }),
        creatorHandleName: (0, zod_1.string)({
            required_error: 'Creator Handle name is required',
            invalid_type_error: "Creator Handle name must be a string",
        }),
        description: (0, zod_1.string)({
            required_error: 'Description is required',
            invalid_type_error: "Description must be a string",
        })
            .min(25, 'Description must have at least 25 characters'),
        launchDate: (0, zod_1.date)({
            required_error: 'Launch Date is required',
            invalid_type_error: "Launch Date must be a number",
        }).optional()
    }).strict()
});
exports.createNewTagSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        tagName: (0, zod_1.string)({
            required_error: 'List name is required',
            invalid_type_error: "List name must be a string",
        })
            .min(2, 'List name must be more than 2 characters'),
        color: (0, zod_1.string)({
            required_error: 'Color is required',
            invalid_type_error: "Color must be a string",
        })
    }).strict()
});
exports.createNewPostSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        postTitle: (0, zod_1.string)({
            required_error: 'Post title is required',
            invalid_type_error: "Post title must be a string",
        })
            .min(5, 'Post title must be more than 5 characters'),
        postBody: (0, zod_1.string)({
            required_error: 'Post body is required',
            invalid_type_error: "Post body must be a string",
        })
            .min(50, 'Post body must be more than 50 characters'),
        postSlug: (0, zod_1.string)({
            required_error: 'Post slug URL is required',
            invalid_type_error: "Post slug URL must be a string",
        }),
        imageUrl: (0, zod_1.string)({
            required_error: 'Post image URL is required',
            invalid_type_error: "Post image URL must be a string",
        }).url()
    }).strict()
});
exports.addNewTagToPostSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        postId: (0, zod_1.number)({
            required_error: "Post Id is required",
            invalid_type_error: "Post Id must be a number",
        }),
        tagName: (0, zod_1.string)({
            required_error: 'Tag name is required',
            invalid_type_error: "Tag name must be a string",
        }),
    }).strict()
});
// Social object for the following array
const Social = (0, zod_1.object)({
    key: (0, zod_1.string)(),
    value: (0, zod_1.string)().url()
});
exports.deployCollectionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string",
        }),
        creatorHandleName: (0, zod_1.string)({
            required_error: 'Creator Handlename is required',
            invalid_type_error: "Creator Handle name must be a string",
        }),
        categoryName: (0, zod_1.string)({
            required_error: 'Category name is required',
            invalid_type_error: "Category name must be a string",
        }),
        socials: (0, zod_1.array)(Social).optional(),
        description: (0, zod_1.string)({
            required_error: 'Description is required',
            invalid_type_error: "Description must be a string",
        })
            .min(15, "Description must be more than 15 characters"),
        imagePath: (0, zod_1.string)({
            required_error: 'Path to image is required',
            invalid_type_error: "Path to image must be a string",
        }),
        price: (0, zod_1.string)({
            required_error: 'Price of NFT is required',
            invalid_type_error: "Price of NFT must be a string",
        }),
        ipfs: (0, zod_1.string)({
            required_error: 'IPFS path is required',
            invalid_type_error: "IPFS path must be a string",
        }),
        startMinting: (0, zod_1.boolean)({
            required_error: 'If minting active boolean is required',
            invalid_type_error: "If minting active parameter must be a boolean",
        }),
        royalty: (0, zod_1.boolean)({
            required_error: 'Royalty setting is required',
            invalid_type_error: "Royalty setting must be a boolean",
        }),
        royaltyAddress: (0, zod_1.string)({
            required_error: 'Royalty Address is required',
            invalid_type_error: "Royalty Address must be a string",
        }),
        royaltyCut: (0, zod_1.string)({
            required_error: 'Royalty cut is required',
            invalid_type_error: "Royalty cut must be a string",
        }),
        videoUrl: (0, zod_1.string)({
            required_error: 'Video URL is required',
            invalid_type_error: "Video URL must be a string",
        }).url(),
        avatarUrl: (0, zod_1.string)({
            required_error: 'Avatar URL is required',
            invalid_type_error: "Avatar URL must be a string",
        }).url(),
        bannerUrl: (0, zod_1.string)({
            required_error: 'Banner URL is required',
            invalid_type_error: "Banner URL must be a string",
        }).url(),
        slug: (0, zod_1.string)({
            required_error: 'Collection slug URL is required',
            invalid_type_error: "Collection slug URL must be a string",
        })
    }).strict()
});
// Extra object for the following array
const Extra = (0, zod_1.object)({
    key: (0, zod_1.string)(),
    value: (0, zod_1.string)()
});
exports.uploadMetadataToCollectionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string",
        }),
        creatorHandleName: (0, zod_1.string)({
            required_error: 'Creator Handlename is required',
            invalid_type_error: "Creator Handle name must be a string",
        }),
        names: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        descriptions: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        images: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        thumbnails: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        prices: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        extras: (0, zod_1.array)(Extra),
        supplies: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        ipfsCID: (0, zod_1.string)({
            required_error: 'IPFSCID path is required',
            invalid_type_error: "IPFSCID must be a string",
        })
            .min(10, "Invalid IPFS Link"),
        slug: (0, zod_1.string)({
            required_error: 'Path to slug URL is required',
            invalid_type_error: "Path to slug URL must be a string",
        })
    }).strict()
});
exports.batchMintSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userAddress: (0, zod_1.string)({
            required_error: 'User Address is required',
            invalid_type_error: "User Address must be a string",
        })
            .min(10, "Wrong Address format"),
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string",
        }),
        metadataIds: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        serials: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
        nfts_Ids: (0, zod_1.array)((0, zod_1.string)()).nonempty(),
    }).strict()
});
exports.toggleMintingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        collectionName: (0, zod_1.string)({
            required_error: 'Collection name is required',
            invalid_type_error: "Collection name must be a string",
        })
    })
});
