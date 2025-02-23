import express from "express";

import { verifyToken } from "../middleware/auth";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", verifyToken, authController.logout);

export default router;
