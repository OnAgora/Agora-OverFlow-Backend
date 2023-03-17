import {
  PrismaClient,
  Prisma,
  Collection,
  NFT,
  CreatorType,
  Category,
  NFTsList,
  Creator,
  Tag,
  Post
} from '@prisma/client';
import { includes } from 'lodash';
const prisma = new PrismaClient();

// Find all Collections in an array
export const getAllCollections = async () => {
  return (await prisma.collection.findMany({
    select: {
      name: true,
      description: true,
      avatarUrl: true,
      address: true,
      launchDate: true,
      slug: true,
      isMinting: true,
      creator: true,
      category: true,
    }
  }))
}

// Return all Creator types in an array
export const getAllCreatorTypes = async () => {
  return (await prisma.creatorType.findMany() as CreatorType[])
}
// Return all Creators in an array
export const getAllCreators = async () => {
  return (await prisma.creator.findMany({
    include: {
      Collections: true,
      NFTs: {
        take: 10,
      }
    }
  }) as Creator[])
}
// Return all Collection Categories in an array
export const getAllCollectionCategories = async () => {
  return (await prisma.category.findMany() as Category[])
}
// Return all Tags in an array
export const getAllTags = async () => {
  return (await prisma.tag.findMany() as Tag[])
}
// Return all Posts in an array
export const getAllPosts = async () => {
  return (await prisma.post.findMany(
    {
      include: {
        tags: true
      }
    }))
};
// Find all Creators for a Type
export const getCreatorsForType = async (input: string | undefined) => {
  return (await prisma.creator.findMany({
    where: {
      creatorType: input
    },
    include: {
      Collections: true,
      NFTs: {
        take: 10,
      }
    }
  })) as Creator[];
};

// Find all collections for a creator
export const getCollectionsForCreator = async (input: Prisma.CreatorWhereUniqueInput) => {
  return (await prisma.creator.findUnique({
    where: input,
    include: {
      Collections: {
        include: {
          category: true
        }
      }
    }
  }));
};

// Find all collections for a category
export const getCollectionsForCategory = async (input: string | undefined) => {
  return (await prisma.collection.findMany({
    where: {
      categoryName: input
    },
    include: {
      creator: true,
      category: true,
      CollectionList: true
    }
  })) as Collection[];
};

// Find all NFTs for a collection
export const getNFTsForCollection = async (input: Prisma.CollectionWhereUniqueInput) => {
  return (await prisma.collection.findUnique({
    where: input,
    include: {
      creator: true,
      NFTs: true
    }
  })) as Collection;
};

// Find Info on One NFT
export const getNFT_Info = async (input: Prisma.NFTWhereUniqueInput) => {
  return (await prisma.nFT.findUnique({
    where: input
  })) as NFT;
};

// Find Collections in a List
export const getCollectionsInList = async (input: Prisma.CollectionsListWhereUniqueInput) => {
  return (await prisma.collectionsList.findUnique({
    where: input,
    select: {
      collections: {
        include: {
          creator: true,
          category: true
        }
      }
    }
  }));
};

// Find NFTs in a List
export const getNFTsInList = async (input: Prisma.NFTsListWhereUniqueInput) => {
  return (await prisma.nFTsList.findUnique({
    where: input,
    select: {
      nfts: {
        include: {
          creator: true,
          collection: true,
        }
      }
    }
  }));
};
// Find Posts with a specific Tag
export const getPostsWithTag = async (input: Prisma.TagWhereUniqueInput) => {
  return (await prisma.tag.findMany({
    where: input,
    select: {
      Posts: true
    }
  }));
};
// Find Posts with a specific Tag
export const getFeaturedPost = async () => {
  return (await prisma.post.findFirst({
    where: {
      featured: true
    },
    include: {
      tags: true
    }
  })) as Post;
};
