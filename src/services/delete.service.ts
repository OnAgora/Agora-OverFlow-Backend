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

// Delete Post service
export const deletePost = async (uniqueInput: Prisma.PostWhereUniqueInput) => {
  return (await prisma.post.delete({
    where: uniqueInput
  }));
};

// Delete Post service
export const deleteTag = async (uniqueInput: Prisma.TagWhereUniqueInput) => {
  return (await prisma.tag.delete({
    where: uniqueInput
  }));
};