import { Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { UserIdJWTPayload } from "../../types/jose";
import { AuthRequest } from "../../types/express";
import { DEV_SECRET } from "../utils";
import { extractToken } from "../utils/auth";

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookieString = req.headers.cookie;
    if (cookieString) {
      const token = extractToken(cookieString);

      if (token) {
        const { payload } = await jwtVerify(
          token,
          new TextEncoder().encode(DEV_SECRET),
        );
        const decodedPayload = payload as UserIdJWTPayload;
        req.userId = decodedPayload.userId;

        next();
      } else {
        res.status(403).json({ message: "No token" });
      }
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
