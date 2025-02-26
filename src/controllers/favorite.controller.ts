import { Request, Response } from "express";
import User from "../models/user.model";
import Product from "../models/product.model";

const getFavorites = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    console.log("Error in getFavorites(): ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const favorite = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(400).json({ message: "Product id is invalid" });
      return;
    }

    const toFavorite: boolean = !user.favorites.includes(productId);
    if (toFavorite) {
      // Add to favorites
      user.favorites.push(productId);
    } else {
      // Remove from favorites
      const index = user.favorites.indexOf(productId);
      if (index !== -1) {
        user.favorites.splice(index, 1);
      }
    }

    await user.save();

    res.status(200).json({
      message: `${toFavorite ? "Added to" : "Removed from"} favorites`,
    });
  } catch (error) {
    console.log("Error in favorite(): ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getFavorites,
  favorite,
};
