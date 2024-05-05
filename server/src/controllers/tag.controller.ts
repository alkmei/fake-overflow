import TagSchema from "../schema/tag.schema";
import { Request, Response } from "express";
import { handleError } from "../utils";
import { AuthRequest } from "../../types/express";
import QuestionSchema from "../schema/question.schema";
import { isAuthorOrStaff } from "../utils/auth";
import UserSchema from "../schema/user.schema";

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
    const tagId = req.params.id;
    const { name } = req.body;

    const tag = await TagSchema.findById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    const isUserAllowed = await isAuthorOrStaff(req, tagId, TagSchema);

    const questions = await QuestionSchema.find(
      { tags: tagId },
      { author: 1, _id: 0 },
    );
    const authorIds = new Set(
      questions.map((question) => question.author.toString()),
    );
    const isTagShared = authorIds.size > 1;

    if (isTagShared) {
      return res.status(403).json({
        message: "Forbidden: Cannot update shared tag",
      });
    }

    if (isUserAllowed) {
      tag.name = name;
      await tag.save();
      res.json({ message: "Tag updated successfully" });
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/tag/:id
export const deleteTag = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  try {
    const tagId = req.params.id;

    const isAllowed = await isAuthorOrStaff(req, tagId, TagSchema);

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const questions = await QuestionSchema.find(
      { tags: tagId },
      { author: 1, _id: 0 },
    );
    const authorIds = new Set(
      questions.map((question) => question.author.toString()),
    );
    const isTagShared = authorIds.size > 1;

    if (isTagShared) {
      return res.status(403).json({
        message: "Forbidden: Cannot delete shared tag",
      });
    }

    const deletedTag = await TagSchema.findByIdAndDelete(tagId);

    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/tags/:name/questions
export const getQuestionByTag = async (
  req: Request<{ name: string }>,
  res: Response,
) => {
  try {
    const tagName = req.params.name;
    const questions = await QuestionSchema.aggregate([
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tagObjects",
        },
      },
      {
        $match: {
          "tagObjects.name": tagName,
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "populatedTags",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorObject",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          summary: 1,
          text: 1,
          tags: "$populatedTags",
          comments: 1,
          answers: 1,
          author: { $arrayElemAt: ["$authorObject", 0] },
          creationTime: 1,
          views: 1,
          votes: 1,
        },
      },
    ]);
    res.json(questions);
  } catch (err) {
    handleError(err, res);
  }
};
