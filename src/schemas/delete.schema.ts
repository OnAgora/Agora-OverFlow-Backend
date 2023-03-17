import { object, string, boolean, array, number, TypeOf } from 'zod';

export const deleteCreatorSchema = object({
  body: object({
    name: string({
      required_error: 'Creator name is required',
      invalid_type_error: "Creator name must be a string",
    })
  }).strict()
})
export type deleteCreatorInput = TypeOf<typeof deleteCreatorSchema>['body'];

export const deleteCategorySchema = object({
  body: object({
    name: string({
      required_error: 'Category name is required',
      invalid_type_error: "Category name must be a string",
    })
  }).strict()
})
export type deleteCategoryInput = TypeOf<typeof deleteCategorySchema>['body'];

export const deleteCollectionListSchema = object({
  body: object({
    name: string({
      required_error: 'Collection List name is required',
      invalid_type_error: "Collection List name must be a string",
    })
  }).strict()
});
export type deleteCollectionListInput = TypeOf<typeof deleteCollectionListSchema>['body'];

export const deleteNFTsListSchema = object({
  body: object({
    name: string({
      required_error: 'NFTs List name is required',
      invalid_type_error: "NFTs List name must be a string",
    })
  }).strict()
});

export type deleteNFTsListInput = TypeOf<typeof deleteNFTsListSchema>['body'];

export const deletePostSchema = object({
  body: object({
    id: number({
      required_error: 'Post Id is required',
      invalid_type_error: "Post Id must be an integer",
    })
  }).strict()
});

export type deletePostInput = TypeOf<typeof deletePostSchema>['body'];

export const deleteTagSchema = object({
  body: object({
    tagName: string({
      required_error: 'Tag name is required',
      invalid_type_error: "Tag name must be a string",
    })
  }).strict()
});

export type deleteTagInput = TypeOf<typeof deleteTagSchema>['body'];
