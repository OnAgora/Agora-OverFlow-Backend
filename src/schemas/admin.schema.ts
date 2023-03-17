import { object, string, boolean, array, number, TypeOf, date } from 'zod';

export const createCreatorTypeSchema = object({
  body: object({
    creatorTypeName: string({
      required_error: 'Creator Type name is required',
      invalid_type_error: "Creator Type name must be a string",
    })
      .min(3, 'Type must be more than 2 characters')
  }).strict()
})

export const createCreatorSchema = object({
  body: object({
    handleName: string({
      required_error: 'HandleName is required',
      invalid_type_error: "HandleName must be a string",
    }),
    name: string({
      required_error: 'Creator name is required',
      invalid_type_error: "Creator name must be a string",
    }),
    creatorTypeName: string({
      required_error: 'Creator type is required',
      invalid_type_error: "Creator type must be a string",
    }),
    description: string({
      required_error: 'Description is required',
      invalid_type_error: "Description must be a string",
    })
      .min(25, 'Description must have at least 25 characters'),
    avatarUrl: string({
      required_error: 'Avatar URL is required',
      invalid_type_error: "Avatar URL must be a string",
    }).url(),
    bannerUrl: string({
      required_error: 'Banner URL is required',
      invalid_type_error: "Banner URL must be a string",
    }).url(),
    body: string({
      required_error: 'Path to body is required',
      invalid_type_error: "Path must be a string",
    }),
    twitter: string().url().nullable().optional(),
    instagram: string().url().nullable().optional(),
    facebook: string().url().nullable().optional(),
    discord: string().url().nullable().optional(),
    slug: string({
      required_error: 'Slug URL is required',
      invalid_type_error: "Slug URL must be a string",
    })
  }).strict()
})

export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: "Name must be a string",
    }),
    imageUrl: string({
      required_error: 'ImageUrl is required',
      invalid_type_error: "ImageUrl must be a string",
    }).url(),
    color: string({
      required_error: 'Color is required',
      invalid_type_error: "Color must be a string",
    })
  }).strict()
})

export const createNewCollectionsListSchema = object({
  body: object({
    listName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
      .min(5, 'List name must be more than 4 characters')
  }).strict()
})

export const addCollectionToListSchema = object({
  body: object({
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string"
    }),
    listName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
  })
})

export const createNewNFTsListSchema = object({
  body: object({
    listName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
      .min(5, 'List name must be more than 4 characters')
  }).strict()
})

export const addNFTtoListSchema = object({
  body: object({
    listName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
      .min(5, 'List name must be more than 4 characters'),
    nftId: string({
      required_error: 'nft ID is required',
      invalid_type_error: "NFT Id must be a string",
    })
  }).strict()
})

export const createComingSoonCollectionSchema = object({
  body: object({
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string",
    }),
    creatorHandleName: string({
      required_error: 'Creator Handle name is required',
      invalid_type_error: "Creator Handle name must be a string",
    }),
    description: string({
      required_error: 'Description is required',
      invalid_type_error: "Description must be a string",
    })
      .min(25, 'Description must have at least 25 characters'),
    launchDate: date({
      required_error: 'Launch Date is required',
      invalid_type_error: "Launch Date must be a number",
    }).optional()
  }).strict()
})

export const createNewTagSchema = object({
  body: object({
    tagName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
      .min(2, 'List name must be more than 2 characters'),
    color: string({
      required_error: 'Color is required',
      invalid_type_error: "Color must be a string",
    })
  }).strict()
})

export const createNewPostSchema = object({
  body: object({
    postTitle: string({
      required_error: 'Post title is required',
      invalid_type_error: "Post title must be a string",
    })
      .min(5, 'Post title must be more than 5 characters'),
    postBody: string({
      required_error: 'Post body is required',
      invalid_type_error: "Post body must be a string",
    })
      .min(50, 'Post body must be more than 50 characters'),
    postSlug: string({
      required_error: 'Post slug URL is required',
      invalid_type_error: "Post slug URL must be a string",
    }),
    imageUrl: string({
      required_error: 'Post image URL is required',
      invalid_type_error: "Post image URL must be a string",
    }).url()
  }).strict()
})

export const addNewTagToPostSchema = object({
  body: object({
    postId: number({
      required_error: "Post Id is required",
      invalid_type_error: "Post Id must be a number",
    }),
    tagName: string({
      required_error: 'Tag name is required',
      invalid_type_error: "Tag name must be a string",
    }),
  }).strict()
})

// Social object for the following array
const Social = object({
  key: string(),
  value: string().url()
})

export const deployCollectionSchema = object({
  body: object({
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string",
    }),
    creatorHandleName: string({
      required_error: 'Creator Handlename is required',
      invalid_type_error: "Creator Handle name must be a string",
    }),
    categoryName: string({
      required_error: 'Category name is required',
      invalid_type_error: "Category name must be a string",
    }),
    socials: array(Social).optional(),
    description: string({
      required_error: 'Description is required',
      invalid_type_error: "Description must be a string",
    })
      .min(15, "Description must be more than 15 characters"),
    imagePath: string({
      required_error: 'Path to image is required',
      invalid_type_error: "Path to image must be a string",
    }),
    price: string({
      required_error: 'Price of NFT is required',
      invalid_type_error: "Price of NFT must be a string",
    }),
    ipfs: string({
      required_error: 'IPFS path is required',
      invalid_type_error: "IPFS path must be a string",
    }),
    startMinting: boolean({
      required_error: 'If minting active boolean is required',
      invalid_type_error: "If minting active parameter must be a boolean",
    }),
    royalty: boolean({
      required_error: 'Royalty setting is required',
      invalid_type_error: "Royalty setting must be a boolean",
    }),
    royaltyAddress: string({
      required_error: 'Royalty Address is required',
      invalid_type_error: "Royalty Address must be a string",
    }),
    royaltyCut: string({
      required_error: 'Royalty cut is required',
      invalid_type_error: "Royalty cut must be a string",
    }),
    videoUrl: string({
      required_error: 'Video URL is required',
      invalid_type_error: "Video URL must be a string",
    }).url(),
    avatarUrl: string({
      required_error: 'Avatar URL is required',
      invalid_type_error: "Avatar URL must be a string",
    }).url(),
    bannerUrl: string({
      required_error: 'Banner URL is required',
      invalid_type_error: "Banner URL must be a string",
    }).url(),
    slug: string({
      required_error: 'Collection slug URL is required',
      invalid_type_error: "Collection slug URL must be a string",
    })
  }).strict()
})

// Extra object for the following array
const Extra = object({
  key: string(),
  value: string()
})

export const uploadMetadataToCollectionSchema = object({
  body: object({
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string",
    }),
    creatorHandleName: string({
      required_error: 'Creator Handlename is required',
      invalid_type_error: "Creator Handle name must be a string",
    }),
    names: array(string()).nonempty(),
    descriptions: array(string()).nonempty(),
    images: array(string()).nonempty(),
    thumbnails: array(string()).nonempty(),
    prices: array(string()).nonempty(),
    extras: array(Extra),
    supplies: array(string()).nonempty(),
    ipfsCID: string({
      required_error: 'IPFSCID path is required',
      invalid_type_error: "IPFSCID must be a string",
    })
      .min(10, "Invalid IPFS Link"),
    slug: string({
      required_error: 'Path to slug URL is required',
      invalid_type_error: "Path to slug URL must be a string",
    })
  }).strict()
})

export const batchMintSchema = object({
  body: object({
    userAddress: string({
      required_error: 'User Address is required',
      invalid_type_error: "User Address must be a string",
    })
      .min(10, "Wrong Address format"),
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string",
    }),
    metadataIds: array(string()).nonempty(),
    serials: array(string()).nonempty(),
  }).strict()
})

export const toggleMintingSchema = object({
  body: object({
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string",
    })
  })
})

// I exported the inferred Typescript types of the schemas with the TypeOf<> type that comes with Zod.
export type creatorTypeInput = TypeOf<typeof createCreatorTypeSchema>['body'];
export type creatorInput = TypeOf<typeof createCreatorSchema>['body'];
export type categoryInput = TypeOf<typeof createCategorySchema>['body'];
export type collectionsListInput = TypeOf<typeof createNewCollectionsListSchema>['body'];
export type deployCollectionSchemaInput = TypeOf<typeof deployCollectionSchema>['body'];
export type addCollectionToListInput = TypeOf<typeof addCollectionToListSchema>['body'];
export type uploadMetadataToCollectionInput = TypeOf<typeof uploadMetadataToCollectionSchema>['body'];
export type toggleMintingInput = TypeOf<typeof toggleMintingSchema>['body'];
export type addNFTtoListInput = TypeOf<typeof addNFTtoListSchema>['body'];
export type createComingSoonCollectionInput = TypeOf<typeof createComingSoonCollectionSchema>['body'];
export type createNewTagInput = TypeOf<typeof createNewTagSchema>['body'];
export type createNewPostInput = TypeOf<typeof createNewPostSchema>['body'];
export type addNewTagToPostInput = TypeOf<typeof addNewTagToPostSchema>['body'];
export type batchMintInput = TypeOf<typeof batchMintSchema>['body'];
