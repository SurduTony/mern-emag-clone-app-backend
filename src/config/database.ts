import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

export default connectDB;
