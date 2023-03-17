import {
  PrismaClient,
  Prisma,
  Collection,
  NFT,
  CreatorType,
  Category,
  Creator,
  CollectionsList,
  Post,
  Tag,
  NFTsList
} from '@prisma/client';
const prisma = new PrismaClient();

// Find unique creatorType

export const findUniqueCreatorType = async (input: Prisma.CreatorTypeWhereUniqueInput) => {
  return (await prisma.creatorType.findUnique({
    where: input
  })) as CreatorType;
};

// Find unique Creator

export const findUniqueCreator = async (input: Prisma.CreatorWhereUniqueInput) => {
  return (await prisma.creator.findUnique({
    where: input
  })) as Creator;
};

// Find unique Category

export const findUniqueCategory = async (input: Prisma.CategoryWhereUniqueInput) => {
  return (await prisma.category.findUnique({
    where: input
  })) as Category;
};

// Find unique Category

export const findUniqueCollection = async (input: Prisma.CollectionWhereUniqueInput) => {
  return (await prisma.collection.findUnique({
    where: input
  })) as Collection;
};

// Find unique Collection List

export const findUniqueCollectionList = async (input: Prisma.CollectionsListWhereUniqueInput) => {
  return (await prisma.collectionsList.findUnique({
    where: input
  })) as CollectionsList;
};

// Find unique NFTs List

export const findUniqueNFTsList = async (input: Prisma.NFTsListWhereUniqueInput) => {
  return (await prisma.nFTsList.findUnique({
    where: input
  })) as NFTsList;
};

// Find unique Post

export const findUniquePost = async (input: Prisma.PostWhereUniqueInput) => {
  return (await prisma.post.findUnique({
    where: input
  })) as Post;
};

// Find unique Tag

export const findUniqueTag = async (input: Prisma.TagWhereUniqueInput) => {
  return (await prisma.tag.findUnique({
    where: input
  })) as Tag;
};