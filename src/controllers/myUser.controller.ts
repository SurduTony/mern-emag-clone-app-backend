import { Request, Response } from "express";
import User from "../models/user.model";

const getMyUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password").select("-__v");
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMyUser(): ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getMyUser,
};
