import { number, object, string, TypeOf, z } from 'zod';

// Find Creators for Type schema
export const getCreatorsForTypeSchema = object({
  query: object({
    creatorTypeName: string({
      required_error: 'Type name is required',
      invalid_type_error: "Type name must be a string",
    })
  }).strict()
})

// Find collections for Creator schema
export const findCollectionsForCreatorSchema = object({
  query: object({
    creatorHandleName: string({
      required_error: 'Creator Handle name is required',
      invalid_type_error: "Creator Handle name must be a string",
    })
      .min(3, 'Creator Handle name must be more than 2 characters')
  }).strict()
})

// Find collections for Category schema
export const getCollectionsForCategorySchema = object({
  query: object({
    categoryName: string({
      required_error: 'Category name is required',
      invalid_type_error: "Category name must be a string",
    })
  }).strict()
})

// Find NFTs for one Collection schema
export const getNFTsForOneCollectionSchema = object({
  query: object({
    collectionName: string({
      required_error: 'Collection name is required',
      invalid_type_error: "Collection name must be a string",
    })
  }).strict()
})

// Find one NFT info schema
export const getOneNFTInfoSchema = object({
  query: object({
    nft_id: string({
      required_error: 'NFT Id is required',
      invalid_type_error: "NFT Id must be a string",
    })
  }).strict()
});

export const getCollectionListSchema = object({
  query: object({
    listName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
      .min(5, 'List name must be more than 4 characters')
  }).strict()
});

export const getNFTsListSchema = object({
  query: object({
    listName: string({
      required_error: 'List name is required',
      invalid_type_error: "List name must be a string",
    })
      .min(5, 'List name must be more than 4 characters')
  }).strict()
});

export const getAllPostsByTagSchema = object({
  query: object({
    tagName: string({
      required_error: 'Tag name is required',
      invalid_type_error: "Tag name must be a string",
    })
  }).strict()
});

export const getPostByIdSchema = object({
  query: object({
    postId: string({
      required_error: 'Post Id is required',
      invalid_type_error: "Post Id must be a string",
    })
  }).strict()
});

// I exported the inferred Typescript types of the schemas with the TypeOf<> type that comes with Zod.
export type findCollectionsForCreatorInput = TypeOf<typeof findCollectionsForCreatorSchema>['query'];
export type getCollectionsForCategoryInput = TypeOf<typeof getCollectionsForCategorySchema>['query'];
export type getNFTsForOneCollectionInput = TypeOf<typeof getNFTsForOneCollectionSchema>['query'];
export type getOneNFTInfoInput = TypeOf<typeof getOneNFTInfoSchema>['query'];
export type getCollectionListInput = TypeOf<typeof getCollectionListSchema>['query'];
export type getNFTsListInput = TypeOf<typeof getNFTsListSchema>['query'];
export type getAllPostsByTagInput = TypeOf<typeof getAllPostsByTagSchema>['query'];
export type getCreatorsForTypeInput = TypeOf<typeof getCreatorsForTypeSchema>['query'];
export type getPostByIdInput = TypeOf<typeof getPostByIdSchema>['query'];
