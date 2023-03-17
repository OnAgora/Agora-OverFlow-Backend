"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redisUrl = process.env.REDIS_URL;
const redisString = redisUrl === null || redisUrl === void 0 ? void 0 : redisUrl.toString();
// @ts-ignore
const ioRedis = new ioredis_1.default(redisString);
//const ioRedis = new Redis();
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ioRedis.set('ioRedis once Again', 'Tastyz');
        console.log('ioRedis Ready');
    }
    catch (error) {
        console.log(error);
        setTimeout(connectRedis, 5000);
    }
});
connectRedis();
exports.default = ioRedis;
