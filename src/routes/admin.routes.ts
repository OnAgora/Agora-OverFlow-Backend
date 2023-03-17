/** @format */

require("dotenv").config();
import express from "express";
import {
  createCreatorTypeHandler,
  createCreatorHandler,
  createCategoryHandler,
  createCollectionsListHandler,
  createNFTsListHandler,
  deployAndCreateCollectionHandler,
  addToCollectionListHandler,
  uploadMetadataHandler,
  toggleMintingHandler,
  addToNFTsListHandler,
  createComingSoonCollectionHandler,
  createTagHandler,
  createPostHandler,
  addTagToPostHandler,
  adminBatchMintHandler,
  uploadMetadataTESTHandler,
} from "../controllers/admin.controller";
// Admin schemas
import {
  createCreatorTypeSchema,
  createCreatorSchema,
  createCategorySchema,
  createNewCollectionsListSchema,
  addCollectionToListSchema,
  createNewNFTsListSchema,
  addNFTtoListSchema,
  createComingSoonCollectionSchema,
  createNewTagSchema,
  createNewPostSchema,
  addNewTagToPostSchema,
  deployCollectionSchema,
  uploadMetadataToCollectionSchema,
  toggleMintingSchema,
  batchMintSchema,
} from "../schemas/admin.schema";
import {
  verifyCreatorTypeExist,
  verifyCreatorExist,
  verifyCollectionCategoryExist,
  verifyCollectionExist,
  verifyPostExist,
  verifyTagExist,
} from "../middleware/validatePrisma";
import { validate } from "../middleware/validate";

const router = express.Router();

//router.use(deserializeUser, requireUser); // Needs to change to Admin Auth

router.post(
  "/createCreatorType",
  validate(createCreatorTypeSchema),
  createCreatorTypeHandler
);

router.post(
  "/createCreator",
  validate(createCreatorSchema),
  verifyCreatorTypeExist,
  createCreatorHandler
);

router.post(
  "/createCategory",
  validate(createCategorySchema),
  createCategoryHandler
);

router.post(
  "/createNewCollectionList",
  validate(createNewCollectionsListSchema),
  createCollectionsListHandler
);

router.post(
  "/createComingSoonCollection",
  validate(createComingSoonCollectionSchema),
  verifyCreatorExist,
  createComingSoonCollectionHandler
);

router.post(
  "/deployCollection",
  validate(deployCollectionSchema),
  verifyCollectionCategoryExist,
  verifyCreatorExist,
  deployAndCreateCollectionHandler
);

router.put(
  "/addCollectionToList",
  validate(addCollectionToListSchema),
  addToCollectionListHandler
);

router.post(
  "/createNewNFTsList",
  validate(createNewNFTsListSchema),
  createNFTsListHandler
);

router.post(
  "/uploadMetadataToCollection",
  validate(uploadMetadataToCollectionSchema),
  verifyCollectionExist,
  verifyCreatorExist,
  uploadMetadataHandler
);

router.put(
  "/toggleMinting",
  validate(toggleMintingSchema),
  verifyCollectionExist,
  toggleMintingHandler
);

router.put("/addNFTtoList", validate(addNFTtoListSchema), addToNFTsListHandler);

router.post("/createNewTag", validate(createNewTagSchema), createTagHandler);

router.post("/createNewPost", validate(createNewPostSchema), createPostHandler);

router.put(
  "/addTagToPost",
  validate(addNewTagToPostSchema),
  verifyPostExist,
  verifyTagExist,
  addTagToPostHandler
);

router.put(
  "/adminBatchMint",
  validate(batchMintSchema),
  verifyCollectionExist,
  adminBatchMintHandler
);

router.post("/uploadTest", uploadMetadataTESTHandler);

/*

router.put("/stripeBatchMint",
  validate(batchMintSchema),
  adminController.stripeBatchMint
); */

export default router;
