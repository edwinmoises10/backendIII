import { Router } from "express";
import {
  ordersControllers,
  orderByIdControllers,
  createOrderControllers,
  orderStatusUpdateControllers,
  deleteByIdControllers
} from "../controllers/orders.controllers.js";

const router = Router();

router.get("/", ordersControllers);
router.get("/:oid", orderByIdControllers);
router.post("/", createOrderControllers);
router.put("/:oid/status", orderStatusUpdateControllers);
router.delete("/:oid", deleteByIdControllers);

export default router;
