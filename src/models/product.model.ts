import mongoose from "mongoose";

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  starRating?: number;
};

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  starRating: { type: Number },
});

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;
