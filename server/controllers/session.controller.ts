import type { Request, Response } from "express";
import UserSchema from "../schema/user.schema";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { errorHandler } from "../util";

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
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = await new SignJWT({ userId: user._id })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode("REPLACE_IF_IN_PROD"));

    res.json({ token });
  } catch (err) {
    errorHandler(err, res);
  }
};
