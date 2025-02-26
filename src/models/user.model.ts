import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  imageUrl?: string;
  favorites: string[];
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash with a salt factor of 10
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
