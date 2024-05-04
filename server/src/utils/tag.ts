import TagSchema from "../schema/tag.schema";
import { ObjectId } from "mongoose";
import UserSchema from "../schema/user.schema";

export const addTagsToDB = async (authorId: ObjectId, tags: string[]) => {
  const author = await UserSchema.findById(authorId);
  const existingTags = await TagSchema.find({ name: { $in: tags } });
  const newTags =
    author!.reputation >= 50
      ? tags
          .filter((t) => !existingTags.some((et) => et.name === t))
          .map((t) => new TagSchema({ name: t, author: authorId }))
      : [];
  await TagSchema.bulkSave(newTags);

  return [...existingTags, ...newTags];
};
