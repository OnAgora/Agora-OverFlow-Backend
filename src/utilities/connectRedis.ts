/** @format */

import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;
const redisString = redisUrl?.toString();
// @ts-ignore
//const ioRedis = new Redis(redisString);
const ioRedis = new Redis();

const connectRedis = async () => {
  try {
    ioRedis.set("ioRedis once Again", "Tastyz");
    console.log("ioRedis Ready");
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default ioRedis;
