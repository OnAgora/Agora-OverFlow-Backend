import { PrismaClient, Prisma, User, Creator, Collection } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import config from 'config';
import redisClient from '../utilities/connectRedis';
import { signJwt } from '../utilities/jwt';


export const excludedFields =
  [
    'password',
    'verified',
    'verificationCode',
    "passwordResetAt",
    "passwordResetToken",
  ];

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const findUser = async (
  where: Partial<Prisma.UserCreateInput>,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({
    where,
    select,
  })) as User;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};

export const updateUser = async (
  where: Partial<Prisma.UserWhereUniqueInput>,
  data: Prisma.UserUpdateInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.update({ where, data, select })) as User;
};

export const signTokens = async (user: Prisma.UserCreateInput) => {
  // 1. Create Session on Redis
  redisClient.set(`${user.id}`, JSON.stringify(user), "EX", config.get<number>('redisCacheExpiresIn') * 60);

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });
  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};