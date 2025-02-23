import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import generateTokenAndSetCookie from "../lib/utils/generateToken";
import User from "../models/user.model";

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Both fields needed" });
      return;
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email already used" });
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({ message: "Register successful" });
  } catch (error) {
    console.log("Error in Register(): ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ message: "Logged in succesfully" });
  } catch (error) {
    console.log("Error in Login(): ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    maxAge: 0,
  });
  res.send();
};

export default {
  register,
  login,
  logout,
};
