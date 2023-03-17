import express from 'express';
import {
  deleteCreatorTypeHandler,
  deleteCreatorHandler,
  deleteCategoryHandler,
  deleteCollectionsListHandler,
  deletePostHandler,
  deleteTagHandler
} from "../controllers/delete.controller";
import {
  deleteCreatorSchema,
  deleteCategorySchema,
  deleteCollectionListSchema,
  deletePostSchema,
  deleteTagSchema
} from "../schemas/delete.schema"
import {
  verifyPostExist,
  verifyTagExist
} from "../middleware/validatePrisma";
import { createCreatorTypeSchema } from "../schemas/admin.schema"
import { validate } from '../middleware/validate';

const router = express.Router();

router.delete("/CreatorType",
  validate(createCreatorTypeSchema),
  deleteCreatorTypeHandler
);

router.delete("/Creator",
  validate(deleteCreatorSchema),
  deleteCreatorHandler
);

router.delete("/CollectionCategory",
  validate(deleteCategorySchema),
  deleteCategoryHandler
);

router.delete("/CollectionList",
  validate(deleteCollectionListSchema),
  deleteCollectionsListHandler
);

router.delete("/Post",
  validate(deletePostSchema),
  verifyPostExist,
  deletePostHandler
);

router.delete("/Tag",
  validate(deleteTagSchema),
  verifyTagExist,
  deleteTagHandler
);

/* router.delete("/deleteNFTsList",
  adminController.deleteNFTsList
); */

export default router;
