import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decode as JwtPayload).userId;

    const user = await User.findById(req.userId);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
