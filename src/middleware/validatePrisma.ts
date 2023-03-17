import { Request, Response, NextFunction } from 'express';
import {
  findUniqueCreatorType,
  findUniqueCreator,
  findUniqueCategory,
  findUniqueCollection,
  findUniqueCollectionList,
  findUniqueNFTsList,
  findUniquePost,
  findUniqueTag
} from '../services/prisma.service'

import {
  findCollectionsForCreatorInput,
  getCollectionListInput,
  getNFTsListInput,
  getAllPostsByTagInput
} from '../schemas/users.schema';
import {
  creatorTypeInput,
} from '../schemas/admin.schema'


// Verify a Creator type exist in the database
export const verifyCreatorTypeExist = async (
  req: Request<{}, {}, creatorTypeInput, creatorTypeInput>,
  res: Response,
  next: NextFunction) => {
  try {
    const creatorTypeNameQuery = req.query.creatorTypeName
    let creatorTypeName: string | undefined = creatorTypeNameQuery?.toString()
    if (!creatorTypeName) creatorTypeName = req.body.creatorTypeName;
    if (creatorTypeName == 'All') {
      next();
    } else {
      const creatorType = await findUniqueCreatorType({ name: creatorTypeName })
      if (creatorType) {
        next();
      } else {
        throw new Error(`Creator Type ${creatorTypeName} not found in the Database`);
      }
    }
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
}

export const verifyCreatorExist = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const creatorHandleNameQuery = req.query.creatorHandleName
    let creatorHandleName: string | undefined = creatorHandleNameQuery?.toString()
    if (!creatorHandleName) creatorHandleName = req.body.creatorHandleName
    const creator = await findUniqueCreator({ handleName: creatorHandleName })
    if (creator) {
      next();
    } else {
      throw new Error(`Creator with handle name '${creatorHandleName}' not found in the Database`);
    }
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
}

export const verifyCollectionCategoryExist = async (
  req: Request<{}, {}, { categoryName: string }, { categoryName: string }>,
  res: Response,
  next: NextFunction) => {
  try {
    const categoryNameQuery = req.query.categoryName
    let categoryName = categoryNameQuery?.toString()
    if (!categoryName) categoryName = req.body.categoryName
    if (categoryName == "All") {
      next()
    } else {
      const category = await findUniqueCategory({ name: categoryName })
      if (category) {
        next();
      } else {
        throw new Error(`Collection category of ${categoryName} not found in the Database`);
      }
    }
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
}

export const verifyCollectionExist = async (
  req: Request<{}, {}, { collectionName: string }, { collectionName: string }>,
  res: Response,
  next: NextFunction) => {
  try {
    const collectionNameQuery = req.query.collectionName
    let collectionName = collectionNameQuery?.toString()
    if (!collectionName) collectionName = req.body.collectionName
    const collection = await findUniqueCollection({ name: collectionName })
    if (collection) {
      next();
    } else {
      throw new Error(`Collection ${collectionName} not found in the Database`);
    }
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
}

export const verifyCollectionListExist = async (
  req: Request<{}, {}, getCollectionListInput, getCollectionListInput>,
  res: Response,
  next: NextFunction) => {
  try {
    const listNameQuery = req.query.listName
    let listName = listNameQuery?.toString()
    if (!listName) listName = req.body.listName

    const list = await findUniqueCollectionList({ name: listName })
    if (list) {
      next();
    } else {
      throw new Error(`Collection list of ${listName} not found in the Database`);
    }

  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const verifyNFTsListExist = async (
  req: Request<{}, {}, getNFTsListInput, getNFTsListInput>,
  res: Response,
  next: NextFunction) => {
  try {
    const listNameQuery = req.query.listName
    let listName = listNameQuery?.toString()
    if (!listName) listName = req.body.listName

    const list = await findUniqueNFTsList({ name: listName })
    if (list) {
      next();
    } else {
      throw new Error(`NFTs list of ${listName} not found in the Database`);
    }

  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
};

export const verifyPostExist =
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: number = req.body.id
      const post = await findUniquePost({ id: postId })
      if (post) {
        next();
      } else {
        throw new Error(`Post by id:${postId} not found in the Database`);
      }
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

export const verifyTagExist = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const tagNameQuery = req.query.tagName
    let tagName = tagNameQuery?.toString()
    if (!tagName) tagName = req.body.tagName

    const tag = await findUniqueTag({ name: tagName })
    if (tag) {
      next();
    } else {
      throw new Error(`Tag by name '${tagName}' not found in the Database`);
    }
  } catch (err: any) {
    res.status(400).send({ error: err.message });
  }
}