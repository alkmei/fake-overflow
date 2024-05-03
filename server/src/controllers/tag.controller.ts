import TagSchema from "../schema/tag.schema";
import { Request, Response } from "express";
import { handleError } from "../utils";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await TagSchema.find({});
    res.json(tags);
  } catch (err) {
    handleError(err, res);
  }
};
