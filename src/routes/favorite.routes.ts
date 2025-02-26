import express from "express";
import { verifyToken } from "../middleware/auth";

import favoriteController from "../controllers/favorite.controller";

const router = express.Router();

router.get("/", verifyToken, favoriteController.getFavorites);
router.post("/:productId", verifyToken, favoriteController.favorite);

export default router;
