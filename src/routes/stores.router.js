import { Router } from "express";
import {
  storesControllers,
  storeByIdControllers,
  createStoreControllers,
  storeIdAndUpdateControllers,
  deleteByIdControllers
} from "../controllers/stores.controllers.js";

const router = Router();

router.get("/", storesControllers);
router.get("/:sid", storeByIdControllers);
router.post("/", createStoreControllers);
router.put("/:sid", storeIdAndUpdateControllers);
router.delete("/:sid", deleteByIdControllers);

export default router;
