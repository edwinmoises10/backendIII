import { Router } from "express";
import {
  productsControllers,
  productByIdControllers,
  createProductControllers,
  productIdAndUpdateControllers,
  deleteByIdControllers
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/", productsControllers);
router.get("/:pid", productByIdControllers);
router.post("/", createProductControllers);
router.put("/:pid", productIdAndUpdateControllers);
router.delete("/:pid", deleteByIdControllers);

export default router;
