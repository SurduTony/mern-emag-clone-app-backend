import { Request, Response } from "express";
import Product from "../models/product.model";

const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).json(products);
};

const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(400).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in getProduct(): ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getProducts,
  getProduct,
};
