import { Router } from "express";
import UserModel from "../models/user.model.js";
import { createUserControllers, deleteByIdControllers, userbyIdControllers, userIdandUpdateControllers, usersControllers } from "../controllers/users.controllers.js";

const router = Router();

router.get("/", usersControllers);
router.get("/:uid", userbyIdControllers);
router.post("/", createUserControllers);
router.put("/:uid", userIdandUpdateControllers);
router.delete("/:uid", deleteByIdControllers);

export default router;
