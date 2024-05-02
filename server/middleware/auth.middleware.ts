import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { UserIdJWTPayload } from "../types/jose";
import { AuthRequest } from "../types/express";
import { DEV_SECRET } from "../utils";

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(DEV_SECRET),
    );
    const decodedPayload = payload as UserIdJWTPayload;
    req.userId = decodedPayload.userId;

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
