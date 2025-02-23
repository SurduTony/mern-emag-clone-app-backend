import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
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
