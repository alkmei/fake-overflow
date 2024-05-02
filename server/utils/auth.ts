import UserSchema from "../schema/user.schema";
import QuestionSchema from "../schema/question.schema";
import { AuthRequest } from "../types/express";

export const isAuthorOrStaff = async (
  req: AuthRequest,
  questionId: string,
): Promise<boolean> => {
  const userId = req.userId;

  const question = await QuestionSchema.findById(questionId).populate(
    "author",
    "isStaff",
  );

  if (!question) {
    return false;
  }

  const isAuthor = question.author._id.toString() === userId;
  const isStaff = await UserSchema.exists({ _id: userId, isStaff: true });

  return isAuthor || !!isStaff;
};
