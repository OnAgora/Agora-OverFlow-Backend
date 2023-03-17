import express from 'express';
import { getMeHandler } from '../controllers/user.controller';

import {
  findCollectionsForCreatorSchema,
  getCollectionsForCategorySchema,
  getNFTsForOneCollectionSchema,
  getOneNFTInfoSchema,
  getCollectionListSchema,
  getNFTsListSchema,
  getAllPostsByTagSchema,
  getPostByIdSchema
} from "../schemas/users.schema"
import {
  getCreatorTypesHandler,
  getAllCategoriesHandler,
  getAllTagsHandler,
  getAllPostsHandler,
  getAllPostsByTagHandler,
  getCreatorsForTypeHandler,
  getCollectionsForCreatorHandler,
  getCollectionsForCategoryHandler,
  getNFTsForCollectionHandler,
  getNFT_InfoHandler,
  getCollectionsInListHandler,
  getNFTsInListHandler,
  getFeaturedPostHandler,
  getPostByIdHandler,
  createCheckoutSession,
  createPaymentIntent
} from "../controllers/users.controller"
import {
  verifyCreatorTypeExist,
  verifyCreatorExist,
  verifyCollectionCategoryExist,
  verifyCollectionExist,
  verifyCollectionListExist,
  verifyNFTsListExist,
  verifyPostExist,
  verifyTagExist
} from '../middleware/validatePrisma';
import { validate } from '../middleware/validate';
const router = express.Router();


router.get('/me', getMeHandler);

router.get("/getCreatorsTypes",
  getCreatorTypesHandler
);

router.get("/getCreatorsForType",
  verifyCreatorTypeExist,
  getCreatorsForTypeHandler
)
// - DEPRECATED
/* router.get("/getCreators",
  getAllCreatorsHandler
); */

router.get("/getCollectionsForCreator",
  validate(findCollectionsForCreatorSchema),
  verifyCreatorExist,
  getCollectionsForCreatorHandler
);

router.get("/getAllCategories",
  getAllCategoriesHandler
);

router.get("/getCollectionsForCategory",
  validate(getCollectionsForCategorySchema),
  verifyCollectionCategoryExist,
  getCollectionsForCategoryHandler
);

router.get("/getCollectionsInList",
  validate(getCollectionListSchema),
  verifyCollectionListExist,
  getCollectionsInListHandler
);

router.get("/getNFTsForCollection",
  validate(getNFTsForOneCollectionSchema),
  verifyCollectionExist,
  getNFTsForCollectionHandler
);

router.get("/getNFTInfo",
  validate(getOneNFTInfoSchema),
  getNFT_InfoHandler
);

router.get("/getNFTsInList",
  validate(getNFTsListSchema),
  verifyNFTsListExist,
  getNFTsInListHandler
);

router.get("/getAllTags",
  getAllTagsHandler
);

router.get("/getAllPosts",
  getAllPostsHandler
);

router.get("/getPost",
  validate(getPostByIdSchema),
  getPostByIdHandler,
);

router.get("/getFeaturedPost",
  getFeaturedPostHandler
);

router.get("/getAllPostsByTag",
  validate(getAllPostsByTagSchema),
  verifyTagExist,
  getAllPostsByTagHandler
);


router.post('/fiatPurchase',
  // createCheckoutSession
  createPaymentIntent,
)


export default router;
