import { Router } from "express";
import {
  populateMocksController,
  generateUsersMockController,
  generateDriversMockController
} from "../controllers/mocks.controllers.js";

const router = Router();

router.post("/populate", populateMocksController);
router.post("/users", generateUsersMockController);
router.post("/drivers", generateDriversMockController);

export default router;
