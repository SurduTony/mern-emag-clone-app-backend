import express from "express";
import myUserController from "../controllers/myUser.controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, myUserController.getMyUser);

export default router;
