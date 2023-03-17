"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const users_schema_1 = require("../schemas/users.schema");
const users_controller_1 = require("../controllers/users.controller");
const validatePrisma_1 = require("../middleware/validatePrisma");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
router.get('/me', user_controller_1.getMeHandler);
router.get("/getCreatorsTypes", users_controller_1.getCreatorTypesHandler);
router.get("/getCreatorsForType", validatePrisma_1.verifyCreatorTypeExist, users_controller_1.getCreatorsForTypeHandler);
// - DEPRECATED
/* router.get("/getCreators",
  getAllCreatorsHandler
); */
router.get("/getCollectionsForCreator", (0, validate_1.validate)(users_schema_1.findCollectionsForCreatorSchema), validatePrisma_1.verifyCreatorExist, users_controller_1.getCollectionsForCreatorHandler);
router.get("/getAllCategories", users_controller_1.getAllCategoriesHandler);
router.get("/getCollectionsForCategory", (0, validate_1.validate)(users_schema_1.getCollectionsForCategorySchema), validatePrisma_1.verifyCollectionCategoryExist, users_controller_1.getCollectionsForCategoryHandler);
router.get("/getCollectionsInList", (0, validate_1.validate)(users_schema_1.getCollectionListSchema), validatePrisma_1.verifyCollectionListExist, users_controller_1.getCollectionsInListHandler);
router.get("/getNFTsForCollection", (0, validate_1.validate)(users_schema_1.getNFTsForOneCollectionSchema), validatePrisma_1.verifyCollectionExist, users_controller_1.getNFTsForCollectionHandler);
router.get("/getNFTInfo", (0, validate_1.validate)(users_schema_1.getOneNFTInfoSchema), users_controller_1.getNFT_InfoHandler);
router.get("/getNFTsInList", (0, validate_1.validate)(users_schema_1.getNFTsListSchema), validatePrisma_1.verifyNFTsListExist, users_controller_1.getNFTsInListHandler);
router.get("/getAllTags", users_controller_1.getAllTagsHandler);
router.get("/getAllPosts", users_controller_1.getAllPostsHandler);
router.get("/getPost", (0, validate_1.validate)(users_schema_1.getPostByIdSchema), users_controller_1.getPostByIdHandler);
router.get("/getFeaturedPost", users_controller_1.getFeaturedPostHandler);
router.get("/getAllPostsByTag", (0, validate_1.validate)(users_schema_1.getAllPostsByTagSchema), validatePrisma_1.verifyTagExist, users_controller_1.getAllPostsByTagHandler);
exports.default = router;
