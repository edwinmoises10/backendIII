import { Router } from "express";
import {
  deliveriesControllers,
  deliveryByIdControllers,
  createDeliveryControllers,
  deliveryStatusUpdateControllers,
  deleteByIdControllers
} from "../controllers/deliveries.controllers.js";

const router = Router();

router.get("/", deliveriesControllers);
router.get("/:did", deliveryByIdControllers);
router.post("/", createDeliveryControllers);
router.put("/:did/status", deliveryStatusUpdateControllers);
router.delete("/:did", deleteByIdControllers);

export default router;
