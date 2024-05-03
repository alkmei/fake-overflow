import type { Request, Response } from "express";
import UserSchema from "../schema/user.schema";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { DEV_SECRET, handleError } from "../utils";
import { UserIdJWTPayload } from "../../types/jose";
import { AuthRequest } from "../../types/express";

/**
 * Despite the use of "session" this controller uses JWT for authentication
 */
export const createSession = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(DEV_SECRET));

    // Set JWT token as an httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    handleError(err, res);
  }
};

export const getSession = async (req: AuthRequest, res: Response) => {
  const cookieString = req.headers.cookie;
  if (cookieString) {
    const token = cookieString
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="))
      ?.split("=")[1];

    if (!token)
      return res.status(401).json({ loggedIn: false, isAdmin: false });

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(DEV_SECRET),
      );
      const decodedPayload = payload as UserIdJWTPayload;
      req.userId = decodedPayload.userId;
      const user = await UserSchema.findById(req.userId);
      if (!user) return res.status(400).json({ message: "User doesn't exist" });

      return res.status(200).json({ loggedIn: true, isAdmin: user.isStaff });
    } catch (err) {
      handleError(err, res);
    }
  }
};
