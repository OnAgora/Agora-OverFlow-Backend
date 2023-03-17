/** @format */

require("dotenv").config();
const { result } = require("../response"),
  messages = require("../utilities/errorMessages"),
  blockchainScripts = require("../utilities/helpers/blockChainScripts"),
  adminHelper = require("../utilities/adminHelper");

import { NextFunction, Request, Response } from "express";
import {
  createCreatorType,
  createCreator,
  createCategory,
  createCollectionsList,
  createCollection,
  findCollection,
  addToCollectionsList,
  createNFTsList,
  createNFT,
  toggleCollectionMinting,
  addToNFTsList,
  createComingSoonCollection,
  createNewTag,
  createNewPost,
  addTagToPost,
  updateIsMinted,
} from "../services/admin.service";
import {
  creatorTypeInput,
  creatorInput,
  categoryInput,
  collectionsListInput,
  deployCollectionSchemaInput,
  addCollectionToListInput,
  uploadMetadataToCollectionInput,
  toggleMintingInput,
  addNFTtoListInput,
  createComingSoonCollectionInput,
  createNewTagInput,
  createNewPostInput,
  addNewTagToPostInput,
  batchMintInput,
} from "../schemas/admin.schema";
// Prisma Client //
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

// TEST
export const uploadMetadataTESTHandler = async (req: any, res: any) => {
  try {
    const response = await blockchainScripts.uploadMetadata(
      "First test",
      "Testing metadata creation for Pieces NFTs",
      "/Alex1.png",
      "ipfs://bafybeihkurbbjxq5v7ag62ahvatrvizmv4tqebzzm26nz6ils4nxgh5ko4"
    );
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

//
// Create Creator Type
//
export const createCreatorTypeHandler = async (
  req: Request<{}, {}, creatorTypeInput>, // The Request interface of ExpressJs is generic so I provided it with the inferred type of the createCreatorTypeSchema to assist Typescript to give us better IntelliSense.
  res: Response,
  next: NextFunction
) => {
  try {
    const creatorType = await createCreatorType({
      name: req.body.creatorTypeName,
    });
    result.creatorType = creatorType;
    result.isError = false;
    result.message = `Creator type of ${req.body.creatorTypeName} was created successfuly!`;
    res.send(result);
    delete result.creatorType;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Creator type of ${req.body.creatorTypeName} already exist, please use another type name`,
        });
      }
    }
    next(err);
  }
};
//
// Create Creator
//
export const createCreatorHandler = async (
  req: Request<{}, {}, creatorInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const creator = await createCreator({
      handleName: req.body.handleName,
      name: req.body.name,
      type: {
        connect: { name: req.body.creatorTypeName },
      },
      description: req.body.description,
      avatarUrl: req.body.avatarUrl,
      bannerUrl: req.body.bannerUrl,
      body: req.body.body,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      discord: req.body.discord,
      slug: req.body.slug,
    });
    result.creator = creator;
    result.isError = false;
    result.message = `Creator of name '${req.body.name}' created successfuly!`;
    res.send(result);
    delete result.creator;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Creator of name ${req.body.name} already exist, please use another creator name`,
        });
      }
    }
    next(err);
  }
};
//
// Create Category
//
export const createCategoryHandler = async (
  req: Request<{}, {}, categoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await createCategory({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      color: req.body.color,
    });
    result.category = category;
    result.isError = false;
    result.message = `Collection category of name '${req.body.name}' created successfuly!`;
    res.send(result);
    delete result.category;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Collection category of name ${req.body.name} already exist, please use another category name`,
        });
      }
    }
    next(err);
  }
};
//
// Create a new Collection List
//
export const createCollectionsListHandler = async (
  req: Request<{}, {}, collectionsListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await createCollectionsList({
      name: req.body.listName,
    });
    result.list = list;
    result.isError = false;
    result.message = `Collection list of name '${req.body.listName}' created successfuly!`;
    res.send(result);
    delete result.list;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Collection list of name ${req.body.listName} already exist, please use another list name`,
        });
      }
    }
    next(err);
  }
};
//
// Create Collection
//
export const deployAndCreateCollectionHandler = async (
  req: Request<{}, {}, deployCollectionSchemaInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = await adminHelper.getContractCode(req.body.collectionName);
    const txnDetails = await blockchainScripts.deployCollection(
      req.body.collectionName,
      req.body.description,
      req.body.imagePath,
      req.body.price,
      req.body.ipfs,
      req.body.socials,
      req.body.startMinting,
      req.body.royalty,
      req.body.royaltyAddress,
      req.body.royaltyCut,
      code
    );
    if (txnDetails === "Successful") {
      // This happens if Cadence transaction is successful.
      try {
        const socials:
          | Array<{
              value: string;
              key: string;
            }>
          | undefined = req.body.socials;
        const twitter = socials ? socials[1].value : "undefined";
        const instagram = socials ? socials[1].value : "undefined";
        const facebook = socials ? socials[1].value : "undefined";
        const discord = socials ? socials[1].value : "undefined";

        const collection = await createCollection({
          name: req.body.collectionName,
          creator: {
            connect: { handleName: req.body.creatorHandleName },
          },
          category: {
            connect: { name: req.body.categoryName },
          },
          description: req.body.description,
          avatarUrl: req.body.avatarUrl,
          bannerUrl: req.body.bannerUrl,
          videoUrl: req.body.videoUrl,
          twitter: twitter,
          instagram: instagram,
          facebook: facebook,
          discord: discord,
          isMinting: req.body.startMinting,
          slug: req.body.slug,
          CollectionList: {
            connect: { name: "Recently Listed" },
          },
        });
        result.collection = collection;
        result.isError = false;
        result.message = `Collection of name '${req.body.collectionName}' created successfuly!`;
        res.send(result);
        delete result.collection;
      } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return res.status(409).json({
              status: "fail",
              message: `Collection of name ${req.body.collectionName} already exist, please use another collection name`,
            });
          }
        }
        next(err);
      }
    } // missing else statement?
  } catch (err: any) {
    result.isError = true;
    result.message = err.message;
    res.send(result);
  }
};
//
// Add to Collection List
//
export const addToCollectionListHandler = async (
  req: Request<{}, {}, addCollectionToListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await addToCollectionsList(
      { name: req.body.collectionName },
      { name: req.body.listName }
    );
    result.list = list;
    result.isError = false;
    result.message = `Collection '${req.body.collectionName}'  added to ${req.body.listName}!`;
    res.send(result);
    delete result.list;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(409).json({
          status: "fail",
          message: `Collections list '${req.body.listName}' doesn't exist, please use a list's name that's in the database`,
        });
      }
    }
    next(err);
  }
};
//
// Create a Coming Soon Collection
//
export const createComingSoonCollectionHandler = async (
  req: Request<{}, {}, createComingSoonCollectionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comingSoonCollection = await createComingSoonCollection({
      collectionName: req.body.collectionName,
      Creator: {
        connect: { handleName: req.body.creatorHandleName },
      },
      description: req.body.description,
      launchDate: req.body.launchDate,
    });
    result.comingSoonCollection = comingSoonCollection;
    result.isError = false;
    result.message = `Coming soon col;ection of name '${req.body.collectionName}' created successfuly!`;
    res.send(result);
    delete result.comingSoonCollection;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Coming soon collection of name ${req.body.collectionName} already exist, please use another collection name`,
        });
      }
    }
    next(err);
  }
};
//
// Create a new NFTs List
//
export const createNFTsListHandler = async (
  req: Request<{}, {}, collectionsListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await createNFTsList({
      name: req.body.listName,
    });
    result.list = list;
    result.isError = false;
    result.message = `NFTs list of name '${req.body.listName}' created successfuly!`;
    res.send(result);
    delete result.list;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `NFTs list of name ${req.body.listName} already exist, please use another list name`,
        });
      }
    }
    next(err);
  }
};
//
// Upload Metadata
//
export const uploadMetadataHandler = async (
  req: Request<{}, {}, uploadMetadataToCollectionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const txnDetails = await blockchainScripts.upload_Metadata(
      req.body.collectionName,
      req.body.names,
      req.body.descriptions,
      req.body.images,
      req.body.thumbnails,
      req.body.prices,
      req.body.extras,
      req.body.supplies,
      req.body.ipfsCID
    );

    if (txnDetails === "Successful") {
      // This happens if Cadence transaction is successful.
      try {
        // Create array of created NFTs
        const NFTs_Created = [];
        // Run a for loop to fill this array with each NFT record created with Prisma
        for (let i = 0; i < req.body.supplies.length; i++) {
          const serials: string = req.body.supplies[i];

          for (let k = 0; k < parseInt(serials); k++) {
            // Create 95 NFTs with different serials
            const nft = await createNFT({
              name: req.body.names[i],
              description: req.body.descriptions[i],
              metadataId: i,
              serial: k,
              collection: {
                connect: { name: req.body.collectionName },
              },
              creator: {
                connect: { handleName: req.body.creatorHandleName },
              },
              image: req.body.images[i],
              isListed: false,
              isMinted: false,
              price: req.body.prices[i],
              slug: req.body.slug,
            });
            NFTs_Created.push(nft);
          }
        }
        // If everything worked
        result.cadence = txnDetails;
        result.NFTs_Created = NFTs_Created;
        result.isError = false;
        result.message = `Metadata uploading failed`;
        res.send(result);
        delete result.NFTs_Created;
        delete result.cadence;
      } catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return res.status(409).json({
              status: "fail",
              message: `Some NFTs with these names inside the ${req.body.collectionName} collection already exist, please use another collection name or NFTs metadatada`,
            });
          }
        }
        next(err);
      }
    } // Maybe missing an else for Cadence error handling(?)
  } catch (err: any) {
    // Need to add more Cadence error handling here
    result.isError = true;
    result.message = err.message;
    res.send(result);
  }
};
//
// Collection toggle minting
//
export const toggleMintingHandler = async (
  req: Request<{}, {}, toggleMintingInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const txnDetails = await blockchainScripts.toggle_minting(
      req.body.collectionName
    );
    if (txnDetails === "Successful") {
      try {
        const collection = await findCollection({
          name: req.body.collectionName,
        });
        const newIsMinting: boolean = !collection.isMinting;
        const updatedCollection = await toggleCollectionMinting(
          { name: req.body.collectionName },
          newIsMinting
        );
        result.updatedCollection = updatedCollection;
        result.isError = false;
        result.message = `Collection ${req.body.collectionName} has changed its minting status to: ${newIsMinting}`;
        res.status(200).send(result);
        delete result.updatedCollection;
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            return res.status(409).json({
              status: "fail",
              message: `Some NFTs with these names inside the ${req.body.collectionName} collection already exist, please use another collection name or NFTs metadatada`,
            });
          }
        }
        next(err);
      }
    }
  } catch (err: any) {
    // Need to add more Cadence error handling here
    result.isError = true;
    result.message = err.message;
    res.send(result);
  }
};
//
// Admin Batch Mint Handler
//
export const adminBatchMintHandler = async (
  req: Request<{}, {}, batchMintInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipient = await adminHelper.fillRecipient(
      req.body.userAddress,
      req.body.serials.length
    );
    const txnDetails = await blockchainScripts.adminMint(
      req.body.collectionName,
      req.body.metadataIds,
      req.body.serials,
      recipient
    );
    if (txnDetails === "Successful") {
      try {
        result.isError = false;
        result.message = messages.nftMintedSuccess;
        res.status(200).send(result);
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === "P2025") {
            return res.status(409).json({
              status: "fail",
              message: `Some NFTs with these names inside the ${req.body.collectionName} collection couldn't be found, please use another collection name or NFTs metadatada`,
            });
          }
        }
        next(err);
      }
    } // Maybe missing an else for Cadence error handling(?)
  } catch (err: any) {
    // Need to add more Cadence error handling here
    result.isError = true;
    result.message = err.message;
    res.send(result);
  }
};
//
// Add to NFTs List
//
export const addToNFTsListHandler = async (
  req: Request<{}, {}, addNFTtoListInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const nft = await addToNFTsList(
      { id: req.body.nftId },
      { name: req.body.listName }
    );
    result.nft = nft;
    result.isError = false;
    result.message = `NFT of id: '${req.body.nftId}'  added to ${req.body.listName}!`;
    res.send(result);
    delete result.nft;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(409).json({
          status: "fail",
          message: `Collections list '${req.body.listName}' doesn't exist, please use a list's name that's in the database`,
        });
      }
    }
    next(err);
  }
};
//
// Create a new Tag
//
export const createTagHandler = async (
  req: Request<{}, {}, createNewTagInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await createNewTag({
      name: req.body.tagName,
      color: req.body.color,
    });
    result.tag = tag;
    result.isError = false;
    result.message = `Tag of name '${req.body.tagName}' was created successfuly!`;
    res.send(result);
    delete result.tag;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Tag of name '${req.body.tagName}' already exist, please use another tag name`,
        });
      }
    }
    next(err);
  }
};
//
// Create a new Post
//
export const createPostHandler = async (
  req: Request<{}, {}, createNewPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await createNewPost({
      title: req.body.postTitle,
      body: req.body.postBody,
      slug: req.body.postSlug,
      imageUrl: req.body.imageUrl,
    });
    // Update last featured post
    let lastPostId = post.id - 1;
    if (lastPostId > 0) {
      let updatedPost = await prisma.post.update({
        where: {
          id: lastPostId,
        },
        data: {
          featured: false,
        },
      });
    }
    result.post = post;
    result.isError = false;
    result.message = `Post of title '${req.body.postTitle}' was created successfuly!`;
    res.send(result);
    delete result.post;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          status: "fail",
          message: `Post of title '${req.body.postTitle}' already exist, please use another post title`,
        });
      }
    }
    next(err);
  }
};
//
// Add Tag to Post handler
//
export const addTagToPostHandler = async (
  req: Request<{}, {}, addNewTagToPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await addTagToPost(
      { id: req.body.postId },
      { name: req.body.tagName }
    );
    result.post = post;
    result.isError = false;
    result.message = `Tag of name '${req.body.tagName}' added to the post of title '${post.title}'`;
    res.send(result);
    delete result.post;
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res.status(409).json({
          status: "fail",
          message: `Post of id '${req.body.postId}' doesn't exist, please use a postId that's in the database`,
        });
      }
    }
    next(err);
  }
};
