"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
// Admin schemas
const admin_schema_1 = require("../schemas/admin.schema");
const validatePrisma_1 = require("../middleware/validatePrisma");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
//router.use(deserializeUser, requireUser); // Needs to change to Admin Auth
router.post("/createCreatorType", (0, validate_1.validate)(admin_schema_1.createCreatorTypeSchema), admin_controller_1.createCreatorTypeHandler);
router.post("/createCreator", (0, validate_1.validate)(admin_schema_1.createCreatorSchema), validatePrisma_1.verifyCreatorTypeExist, admin_controller_1.createCreatorHandler);
router.post("/createCategory", (0, validate_1.validate)(admin_schema_1.createCategorySchema), admin_controller_1.createCategoryHandler);
router.post("/createNewCollectionList", (0, validate_1.validate)(admin_schema_1.createNewCollectionsListSchema), admin_controller_1.createCollectionsListHandler);
router.post("/createComingSoonCollection", (0, validate_1.validate)(admin_schema_1.createComingSoonCollectionSchema), validatePrisma_1.verifyCreatorExist, admin_controller_1.createComingSoonCollectionHandler);
router.post("/deployCollection", (0, validate_1.validate)(admin_schema_1.deployCollectionSchema), validatePrisma_1.verifyCollectionCategoryExist, validatePrisma_1.verifyCreatorExist, admin_controller_1.deployAndCreateCollectionHandler);
router.put("/addCollectionToList", (0, validate_1.validate)(admin_schema_1.addCollectionToListSchema), admin_controller_1.addToCollectionListHandler);
router.post("/createNewNFTsList", (0, validate_1.validate)(admin_schema_1.createNewNFTsListSchema), admin_controller_1.createNFTsListHandler);
router.post("/uploadMetadataToCollection", (0, validate_1.validate)(admin_schema_1.uploadMetadataToCollectionSchema), validatePrisma_1.verifyCollectionExist, validatePrisma_1.verifyCreatorExist, admin_controller_1.uploadMetadataHandler);
router.put("/toggleMinting", (0, validate_1.validate)(admin_schema_1.toggleMintingSchema), validatePrisma_1.verifyCollectionExist, admin_controller_1.toggleMintingHandler);
router.put("/addNFTtoList", (0, validate_1.validate)(admin_schema_1.addNFTtoListSchema), admin_controller_1.addToNFTsListHandler);
router.post("/createNewTag", (0, validate_1.validate)(admin_schema_1.createNewTagSchema), admin_controller_1.createTagHandler);
router.post("/createNewPost", (0, validate_1.validate)(admin_schema_1.createNewPostSchema), admin_controller_1.createPostHandler);
router.put("/addTagToPost", (0, validate_1.validate)(admin_schema_1.addNewTagToPostSchema), validatePrisma_1.verifyPostExist, validatePrisma_1.verifyTagExist, admin_controller_1.addTagToPostHandler);
router.put("/adminBatchMint", (0, validate_1.validate)(admin_schema_1.batchMintSchema), validatePrisma_1.verifyCollectionExist, admin_controller_1.adminBatchMintHandler);
/*

router.put("/stripeBatchMint",
  validate(batchMintSchema),
  adminController.stripeBatchMint
); */
exports.default = router;
