import { Router } from "express";
import { loggerTestController } from "../controllers/logger.controllers.js";

const router = Router();

router.get("/test", loggerTestController);

export default router;
