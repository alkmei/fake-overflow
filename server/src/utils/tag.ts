import TagSchema from "../schema/tag.schema";
import { ObjectId } from "mongoose";

export const addTagsToDB = async (authorId: ObjectId, tags: string[]) => {
  const existingTags = await TagSchema.find({ name: { $in: tags } });
  const newTags = tags
    .filter((t) => !existingTags.some((et) => et.name === t))
    .map((t) => new TagSchema({ name: t, author: authorId }));
  await TagSchema.bulkSave(newTags);

  return [...existingTags, ...newTags];
};
