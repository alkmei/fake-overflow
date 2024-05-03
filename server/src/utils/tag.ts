import TagSchema from "../schema/tag.schema";
import User from "../../types/user";
import { Document } from "mongoose";

export const addTagsToDB = async (
  author: Document<unknown, {}, User>,
  tags: string[],
) => {
  const existingTags = await TagSchema.find({ name: { $in: tags } });
  const newTags = tags
    .filter((t) => !existingTags.some((et) => et.name === t))
    .map((t) => new TagSchema({ name: t, author: author }));
  await TagSchema.bulkSave(newTags);

  return [...existingTags, ...newTags];
};
