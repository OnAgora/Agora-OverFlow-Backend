"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delete_controller_1 = require("../controllers/delete.controller");
const delete_schema_1 = require("../schemas/delete.schema");
const validatePrisma_1 = require("../middleware/validatePrisma");
const admin_schema_1 = require("../schemas/admin.schema");
const validate_1 = require("../middleware/validate");
const router = express_1.default.Router();
router.delete("/CreatorType", (0, validate_1.validate)(admin_schema_1.createCreatorTypeSchema), delete_controller_1.deleteCreatorTypeHandler);
router.delete("/Creator", (0, validate_1.validate)(delete_schema_1.deleteCreatorSchema), delete_controller_1.deleteCreatorHandler);
router.delete("/CollectionCategory", (0, validate_1.validate)(delete_schema_1.deleteCategorySchema), delete_controller_1.deleteCategoryHandler);
router.delete("/CollectionList", (0, validate_1.validate)(delete_schema_1.deleteCollectionListSchema), delete_controller_1.deleteCollectionsListHandler);
router.delete("/Post", (0, validate_1.validate)(delete_schema_1.deletePostSchema), validatePrisma_1.verifyPostExist, delete_controller_1.deletePostHandler);
router.delete("/Tag", (0, validate_1.validate)(delete_schema_1.deleteTagSchema), validatePrisma_1.verifyTagExist, delete_controller_1.deleteTagHandler);
/* router.delete("/deleteNFTsList",
  adminController.deleteNFTsList
); */
exports.default = router;
