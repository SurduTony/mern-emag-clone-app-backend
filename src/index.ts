import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/database";

import authRoutes from "./routes/auth.routes";
import myUserRoutes from "./routes/myUser.routes";
import productRoutes from "./routes/product.routes";
import favoriteRoutes from "./routes/favorite.routes";

const app = express();
const port = 7000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/me", myUserRoutes);
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoriteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
