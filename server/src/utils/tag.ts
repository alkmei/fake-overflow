import TagSchema from "../schema/tag.schema";
import { ObjectId } from "mongoose";
import UserSchema from "../schema/user.schema";
import QuestionSchema from "../schema/question.schema";

export const addTagsToDB = async (authorId: ObjectId, tags: string[]) => {
  const author = await UserSchema.findById(authorId);
  const existingTags = await TagSchema.find({ name: { $in: tags } });
  const newTags =
    author!.reputation >= 50 || author!.isStaff
      ? tags
          .filter((t) => !existingTags.some((et) => et.name === t))
          .map(
            (t) => new TagSchema({ name: t.toLowerCase(), author: authorId }),
          )
      : [];
  await TagSchema.bulkSave(newTags);

  return [...existingTags, ...newTags];
};

export const findOrphanTags = async () => {
  try {
    const allQuestions = await QuestionSchema.find({}, { tags: 1, _id: 0 });
    const usedTagIds = allQuestions.flatMap((question) => question.tags);

    return await TagSchema.find({
      _id: { $nin: usedTagIds },
    });
  } catch (err) {
    throw new Error(`Error finding orphan tags: ${err}`);
  }
};
