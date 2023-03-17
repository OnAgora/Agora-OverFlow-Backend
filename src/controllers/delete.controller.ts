const { result } = require('../response');
import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import {
  createCreatorType,
  deleteCreatorType,
  createCreator,
  deleteCreator,
  createCategory,
  deleteCategory,
  createCollectionsList,
  deleteCollectionsList
} from '../services/admin.service';
import {
  deletePost,
  deleteTag
} from "../services/delete.service";
import {
  creatorTypeInput,
  creatorInput,
  categoryInput
} from '../schemas/admin.schema';
import {
  deleteCreatorInput,
  deleteCategoryInput,
  deleteCollectionListInput,
  deleteNFTsListInput,
  deletePostInput,
  deleteTagInput
} from '../schemas/delete.schema';


//
// Delete Creator Type
//
export const deleteCreatorTypeHandler = async (
  req: Request<{}, {}, creatorTypeInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.body.creatorTypeName
    const creatorType = await deleteCreatorType({
      name: type
    })
    result.creatorType = creatorType
    result.isError = false;
    result.message = `Creator type of ${type} deleted successfully!`;
    res.send(result);
    delete result.creatorType
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Creator type of ${req.body.creatorTypeName} doesn't exist, please use a type name that's in the database`
        });
      }
    }
    next(err);
  }
}
//
// Delete Creator
//
export const deleteCreatorHandler = async (
  req: Request<{}, {}, deleteCreatorInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name
    const creator = await deleteCreator({
      name: name
    })
    result.creator = creator
    result.isError = false;
    result.message = `Creator of name '${name}' deleted successfuly!`;
    res.send(result);
    delete result.creator
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Creator '${req.body.name}' doesn't exist, please use a creator's name that's in the database`
        });
      }
    }
    next(err);
  }
}
//
// Delete Collection Category
//
export const deleteCategoryHandler = async (
  req: Request<{}, {}, deleteCategoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name
    const category = await deleteCategory({
      name: name
    })
    result.category = category
    result.isError = false;
    result.message = `Category of name '${name}' deleted successfuly!`;
    res.send(result);
    delete result.category
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Category '${req.body.name}' doesn't exist, please use a category's name that's in the database`
        });
      }
    }
    next(err);
  }
}
//
// Delete Collection List
//
export const deleteCollectionsListHandler = async (
  req: Request<{}, {}, deleteCollectionListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name
    const list = await deleteCollectionsList({ name: name })
    result.list = list
    result.isError = false;
    result.message = `Collections list of name '${name}' deleted successfuly!`;
    res.send(result);
    delete result.list
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Collections list '${req.body.name}' doesn't exist, please use a list's name that's in the database`
        });
      }
    }
    next(err);
  }
}
//
// Delete NFTs List
//
export const deleteNFTsListHandler = async (
  req: Request<{}, {}, deleteNFTsListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name
    const list = await deleteCollectionsList({
      name: name
    })
    result.list = list
    result.isError = false;
    result.message = `Collections list of name '${name}' deleted successfuly!`;
    res.send(result);
    delete result.list
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Collections list '${req.body.name}' doesn't exist, please use a list's name that's in the database`
        });
      }
    }
    next(err);
  }
}
//
// Delete Post by id Handler
//
export const deletePostHandler = async (
  req: Request<{}, {}, deletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.body.id
    const post = await deletePost({ id: postId })
    result.post = post
    result.isError = false;
    result.message = `Post of title '${post.title}' deleted successfuly!`;
    res.send(result);
    delete result.post
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Post with id '${req.body.id}' doesn't exist, please use a post id that's in the database`
        });
      }
    }
    next(err);
  }
}
//
// Delete Tag by name Handler
//
export const deleteTagHandler = async (
  req: Request<{}, {}, deleteTagInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagName = req.body.tagName
    const tag = await deleteTag({ name: tagName })
    result.tag = tag
    result.isError = false;
    result.message = `Tag of name '${tag.name}' deleted successfuly!`;
    res.send(result);
    delete result.tag
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return res.status(409).json({
          status: 'fail',
          message: `Tag with name '${req.body.tagName}' doesn't exist, please use a tag name that's in the database`
        });
      }
    }
    next(err);
  }
}


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