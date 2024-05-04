import UserSchema from "../schema/user.schema";
import QuestionSchema from "../schema/question.schema";
import { AuthRequest } from "../../types/express";
import { Model } from "mongoose";

export const isAuthorOrStaff = async (
  req: AuthRequest,
  id: string,
  schema: Model<any>,
): Promise<boolean> => {
  const userId = req.userId;

  const document = await schema.findById(id).populate("author", "isStaff");

  if (!document) {
    return false;
  }

  const isAuthor = document.author._id.toString() === userId;
  const isStaff = await UserSchema.exists({ _id: userId, isStaff: true });

  return isAuthor || !!isStaff;
};

export const isSelfOrStaff = async (req: AuthRequest, userId: string) => {
  const id = req.userId;
  const isSelf = id === userId;
  const isStaff = await UserSchema.exists({ _id: userId, isStaff: true });
  return !!isStaff || isSelf;
};

export const extractToken = (cookieString: string) => {
  return cookieString
    .split(";")
    .find((cookie) => cookie.trim().startsWith("access_token="))
    ?.split("=")[1];
};
