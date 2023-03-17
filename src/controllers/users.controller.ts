require('dotenv').config();
import { NextFunction, Request, Response, query } from 'express';
import {
  findUniquePost
} from "../services/prisma.service";
import {
  getAllCollectionCategories,
  getAllCollections,
  getAllCreatorTypes,
  getCreatorsForType,
  getAllCreators,
  getAllTags,
  getAllPosts,
  getCollectionsForCreator,
  getCollectionsForCategory,
  getNFTsForCollection,
  getNFT_Info,
  getCollectionsInList,
  getNFTsInList,
  getPostsWithTag,
  getFeaturedPost,
} from '../services/users.service';
import {
  getCreatorsForTypeInput,
  findCollectionsForCreatorInput,
  getCollectionsForCategoryInput,
  getNFTsForOneCollectionInput,
  getOneNFTInfoInput,
  getCollectionListInput,
  getNFTsListInput,
  getPostByIdInput
} from '../schemas/users.schema';
import {
  createNewTagInput
} from '../schemas/admin.schema'
// Prisma Client //
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient()
const
  result = require('../response/result.js'),
  messages = require("../utilities/errorMessages");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
//
// Find Creators for Type Handler
//
export const getCreatorsForTypeHandler = async (
  req: Request<{}, {}, {}, getCreatorsForTypeInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.creatorTypeName
    const creatorTypeName = query?.toString()

    if (creatorTypeName == 'All') {
      const creators = await getAllCreators()
      result.creators = creators
      result.isError = false;
      result.message = `All creators fetched successfuly!`;
      res.send(result);
      delete result.creators
    } else {
      const creators = await getCreatorsForType(creatorTypeName)
      result.creators = creators
      result.isError = false;
      result.message = `Creators of type '${req.query.creatorTypeName}' fetched successfuly!`;
      res.send(result);
      delete result.creators
    }
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: `Collection for category ${req.query.creatorTypeName} not found`,
        });
      }
    }
    next(err);
  }
}
//
// Find All Creators Handler
//
export const getAllCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCollectionCategories()
    result.isError = false;
    result.categories = categories
    result.message = `Categories found successfully!`
    res.send(result);
    delete result.categories
  } catch (err: any) {
    next(err);
  }
};
//
// Find Collections for Creator Handler
//
export const getCollectionsForCreatorHandler = async (
  req: Request<{}, {}, {}, findCollectionsForCreatorInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.creatorHandleName
    const creatorName = query?.toString()
    const creator = await getCollectionsForCreator({ handleName: creatorName })
    result.creator = creator
    result.isError = false;
    result.message = `${creatorName}'s collections fetched successfuly!`;
    res.send(result);
    delete result.creator
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: `Collection for creator ${req.query.creatorHandleName} not found`,
        });
      }
    }
    next(err);
  }
}
//
// Find Collections for Category Handler
//
export const getCollectionsForCategoryHandler = async (
  req: Request<{}, {}, {}, getCollectionsForCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.categoryName
    const categoryName = query?.toString()

    if (categoryName == 'All') {
      const collections = await getAllCollections()
      result.collections = collections
      result.isError = false;
      result.message = `All collections fetched successfuly!`;
      res.send(result);
      delete result.collections
    } else {
      const collections = await getCollectionsForCategory(categoryName)
      result.collections = collections
      result.isError = false;
      result.message = `${req.query.categoryName}'s collections fetched successfuly!`;
      res.send(result);
      delete result.collections
    }
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: `Collection for category ${req.query.categoryName} not found`,
        });
      }
    }
    next(err);
  }
}
//
// Find NFTs for Collection Handler
//
export const getNFTsForCollectionHandler = async (
  req: Request<{}, {}, {}, getNFTsForOneCollectionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.collectionName
    const collectionName = query?.toString()
    const collection = await getNFTsForCollection({ name: collectionName })
    result.collection = collection
    result.isError = false;
    result.message = `${collectionName}'s NFTs fetched successfuly!`;
    res.send(result);
    delete result.collection
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: `NFTs for collection ${req.query.collectionName} not found`,
        });
      }
    }
    next(err);
  }
}
//
// Find Info on one NFT handler
//
export const getNFT_InfoHandler = async (
  req: Request<{}, {}, {}, getOneNFTInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.nft_id
    const nft_id: string | undefined = query?.toString()
    const nft = await getNFT_Info({ id: nft_id })
    result.nft = nft
    result.isError = false;
    result.message = `NFT of id: '${nft.id}' fetched successfuly!`;
    res.send(result);
    delete result.nft
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        return res.status(409).json({
          status: 'fail',
          message: `NFT of id: '${req.query.nft_id}' not found`,
        });
      }
    }
    next(err);
  }
}
//
// Get Creator Types handler
//
export const getCreatorTypesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creatorsTypes = await getAllCreatorTypes()
    const types = creatorsTypes.map(object => {
      return object["name"]
    })
    result.creatorTypes = types
    result.isError = false;
    result.message = "Creators types found successfully!"
    res.send(result);
    delete result.creatorTypes
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        return res.status(409).json({
          status: 'fail',
          message: `Creator types not found`,
        });
      }
    }
    next(err);
  }
};
//
// Get Collections in a List handler
//
export const getCollectionsInListHandler = async (
  req: Request<{}, {}, getCollectionListInput, getCollectionListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.listName
    const listName = query?.toString()
    const list = await getCollectionsInList({ name: listName })
    result.collections = list?.collections
    result.isError = false;
    result.message = `Collections of list '${listName}' found successfully!`
    res.send(result);
    delete result.collections
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        return res.status(409).json({
          status: 'fail',
          message: `List named ${req.query.listName} not found in the database`,
        });
      }
    }
    next(err);
  }
};
//
// Get NFTs in a List handler
//
export const getNFTsInListHandler = async (
  req: Request<{}, {}, getNFTsListInput, getNFTsListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.listName
    const listName = query?.toString()
    const list = await getNFTsInList({ name: listName })
    result.nfts = list?.nfts
    result.isError = false;
    result.message = `NFTs of list '${listName}' found successfully!`
    res.send(result);
    delete result.nfts
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        return res.status(409).json({
          status: 'fail',
          message: `List named ${req.query.listName} not found in the database`,
        });
      }
    }
    next(err);
  }
};
//
// Find All Tags Handler
//
export const getAllTagsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await getAllTags()
    result.isError = false;
    result.tags = tags
    result.message = `All Tags found successfully!`
    res.send(result);
    delete result.tags
  } catch (err: any) {
    next(err);
  }
};
//
// Find All Posts Handler
//
export const getAllPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPosts()
    result.isError = false;
    result.posts = posts
    result.message = `All Posts found successfully!`
    res.send(result);
    delete result.posts
  } catch (err: any) {
    next(err);
  }
};
//
// Find Featured Post Handler
//
export const getPostByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const postId = req.query.postId
    // @ts-ignore
    let postIdNumber = parseInt(postId)
    const post = await findUniquePost({ id: postIdNumber })
    if (post) {
      result.isError = false;
      result.post = post
      result.message = `Post of title ${post.title} found successfully!`
      res.send(result);
      delete result.post
    } else {
      result.isError = true;
      result.message = `Post by id '${req.query.postId}' doesn't exist, please use a post's id that's in the database`
      return res.status(409).send(result);
    }
  } catch (err: any) {
    next(err);
  }
};
//
// Find All Posts with a certain Tag Handler
//
export const getAllPostsByTagHandler = async (
  req: Request<{}, {}, createNewTagInput, createNewTagInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.tagName
    const tagName = query?.toString()
    const posts = await getPostsWithTag({ name: tagName })
    result.posts = posts[0].Posts
    result.isError = false;
    result.message = `Posts by tag '${tagName}' found successfully!`
    res.send(result);
    delete result.posts
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2001') {
        return res.status(409).json({
          status: 'fail',
          message: `List named ${req.query.tagName} not found in the database`,
        });
      }
    }
    next(err);
  }
};
//
// Find Featured Post Handler
//
export const getFeaturedPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await getFeaturedPost()
    result.isError = false;
    result.post = post
    result.message = `Featured Post found successfully!`
    res.send(result);
    delete result.post
  } catch (err: any) {
    next(err);
  }
};
//
// Create a Stripe checkout session
//
export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  const nft_id: string | undefined = req.body.nft_id?.toString()
  const nft = await getNFT_Info({ id: nft_id })
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: nft?.price || 1000,
          product_data: {
            name: `Purchase ${nft?.name || 'NFT'} on Nporium`,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: req.body.success_url,
    cancel_url: req.body.cancel_url,
  });

  res.send(session);
};
//
// Create a Stripe payment intent
//
export const createPaymentIntent =async (req: Request, res: Response, next: NextFunction) => {
  
  const nft_id: string | undefined = req.body.nft_id?.toString();
  const nft = await getNFT_Info({ id: nft_id })
  // const nft = {
  //   "id": "1cbdcfcd-3f8b-4398-8ed0-c753e1f260ed",
  //   "name": "Fifth NFT",
  //   "description": "5th description",
  //   "metadataId": 1,
  //   "serial": 1,
  //   "collectionName": "YoungApeDiaries36",
  //   "address": "0x5593df7d286bcdb8",
  //   "creatorHandleName": "Alex_Echo",
  //   "image": "Alex5.png",
  //   "isListed": false,
  //   "isMinted": true,
  //   "price": 1250.0,
  //   "slug": "path to slug00",
  //   "createdAt": "2023-01-12T17:32:46.534Z",
  //   "updatedAt": null,
  //   "nFTsListName": null
  // }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: nft?.price || 1000,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.json({
    client_secret: paymentIntent.client_secret,
  });
}