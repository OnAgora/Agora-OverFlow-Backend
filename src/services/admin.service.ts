import {
  PrismaClient,
  Prisma,
  CreatorType,
  Creator,
  Category,
  CollectionsList,
  NFTsList,
  Collection,
  NFT,
  CreatorComingSoon,
  Tag,
  Post
} from '@prisma/client';
const prisma = new PrismaClient();

// Create creator type
export const createCreatorType = async (input: Prisma.CreatorTypeCreateInput) => {
  return (await prisma.creatorType.create({
    data: input,
  })) as CreatorType;
};
// Delete creator type
export const deleteCreatorType = async (uniqueInput: Prisma.CreatorTypeWhereUniqueInput) => {
  return (await prisma.creatorType.delete({
    where: uniqueInput
  }));
};
// Create creator
export const createCreator = async (input: Prisma.CreatorCreateInput) => {
  return (await prisma.creator.create({
    data: input,
  })) as Creator;
};
// Delete creator
export const deleteCreator = async (uniqueInput: Prisma.CreatorWhereUniqueInput) => {
  return (await prisma.creator.delete({
    where: uniqueInput
  }));
};
// Create category
export const createCategory = async (input: Prisma.CategoryCreateInput) => {
  return (await prisma.category.create({
    data: input,
  })) as Category;
};
// Delete category
export const deleteCategory = async (uniqueInput: Prisma.CategoryWhereUniqueInput) => {
  return (await prisma.category.delete({
    where: uniqueInput
  }));
};
// Create collections list
export const createCollectionsList = async (input: Prisma.CollectionsListCreateInput) => {
  return (await prisma.collectionsList.create({
    data: input,
  })) as CollectionsList;
};
// Create Collection
export const createCollection = async (input: Prisma.CollectionCreateInput) => {
  return (await prisma.collection.create({
    data: input,
  })) as Collection;
};
// Find Collection
export const findCollection = async (where: Prisma.CollectionWhereUniqueInput) => {
  return (await prisma.collection.findUnique({
    where: where,
    select: {
      isMinting: true
    }
  })) as Collection;
}
// Add to a collections list
export const addToCollectionsList = async (
  uniqueCollection: Prisma.CollectionWhereUniqueInput,
  uniqueList: Prisma.CollectionsListWhereUniqueInput,
) => {
  return (await prisma.collection.update({
    where: uniqueCollection,
    data: {
      CollectionList: {
        connect: uniqueList
      }
    }
  })) as Collection;
};
// Create Coming Soon Collection
export const createComingSoonCollection = async (
  input: Prisma.CreatorComingSoonCreateInput
) => {
  return (await prisma.creatorComingSoon.create({
    data: input
  })) as CreatorComingSoon;
};
// Collection Minting
export const toggleCollectionMinting = async (
  uniqueCollection: Prisma.CollectionWhereUniqueInput,
  boolean: boolean
) => {
  return (await prisma.collection.update({
    where: uniqueCollection,
    data: {
      isMinting: boolean
    }
  })) as Collection;
}
// Delete collections list
export const deleteCollectionsList = async (uniqueInput: Prisma.CollectionsListWhereUniqueInput) => {
  return (await prisma.collectionsList.delete({
    where: uniqueInput
  })) as CollectionsList;
};
// Create NFTs list
export const createNFTsList = async (input: Prisma.NFTsListCreateInput) => {
  return (await prisma.nFTsList.create({
    data: input,
  })) as NFTsList;
};
export const createNFT = async (input: Prisma.NFTCreateInput) => {
  return (await prisma.nFT.create({
    data: input,
  })) as NFT
};
// Update if NFT is minted
export const updateIsMinted = async (
  uniqueNFT: Prisma.NFTWhereUniqueInput
) => {
  return (await prisma.nFT.update({
    where: uniqueNFT,
    data: {
      isMinted: true
    }
  })) as NFT;
};
// Add to a NFTs list
export const addToNFTsList = async (
  uniqueNFT: Prisma.NFTWhereUniqueInput,
  uniqueList: Prisma.CollectionsListWhereUniqueInput,
) => {
  return (await prisma.nFT.update({
    where: uniqueNFT,
    data: {
      List: {
        connect: uniqueList
      }
    }
  })) as NFT;
};
// Create a new tag
export const createNewTag = async (input: Prisma.TagCreateInput) => {
  return (await prisma.tag.create({
    data: input
  })) as Tag;
}
// Create a new post
export const createNewPost = async (input: Prisma.PostCreateInput) => {
  return (await prisma.post.create({
    data: input
  })) as Post;
}
// Add to a Tag to a Post
export const addTagToPost = async (
  uniquePostId: Prisma.PostWhereUniqueInput,
  uniqueTag: Prisma.TagWhereUniqueInput,
) => {
  return (await prisma.post.update({
    where: uniquePostId,
    data: {
      tags: {
        connect: uniqueTag
      }
    }
  })) as Post;
};