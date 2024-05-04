import TagSchema from "../schema/tag.schema";
import { Request, Response } from "express";
import { handleError } from "../utils";
import { AuthRequest } from "../../types/express";

// GET /api/tags?s=
export const getTags = async (
  req: Request<{}, {}, {}, { s: string }>,
  res: Response,
) => {
  try {
    const searchQuery = req.query.s as string;
    let tags;

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      tags = await TagSchema.find({ name: { $regex: regex } }).populate(
        "author",
      );
    } else tags = await TagSchema.find({}).populate("author");

    res.json(tags);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/tags/:id
export const getTag = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const tag = await TagSchema.findById(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/tags/:id
export const updateTag = async (
  req: AuthRequest<{ id: string }, {}, { name: string }>,
  res: Response,
) => {
  try {
    const tag = await TagSchema.findByIdAndUpdate(req.params.id, req.body, {});
    res.json({ message: "WIP" });
  } catch (err) {
    handleError(err, res);
  }
};
