"use server";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "@/lib/actions/shared.types";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    //  return 3 random tags
    const tags = await Tag.aggregate([
      {
        $sample: { size: 3 },
        //   name must be less than 8 characters
      },
      {
        $match: {
          name: { $not: { $regex: /(\w{8,})/ } },
        },
      },
    ]);
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 12, filter, searchQuery } = params;
    // const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Tag> = {};
    const skipAmount = (page - 1) * pageSize;
    if (searchQuery) {
      query.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        console.log("popular");
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        console.log("recent");
        break;
      case "name":
        sortOptions = { name: 1 };
        console.log("name");
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        console.log("old");
        break;
      default:
        break;
    }
    const totalTags = await Tag.countDocuments(query);
    const isNext = totalTags > skipAmount + pageSize;
    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);
    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId, searchQuery, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        skip: skipAmount,
        limit: pageSize,
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        {
          path: "author",
          model: User,
          select: "_id clerkId name picture",
        },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    // Check if there are more questions for the next page
    const isNext =
      (await Question.countDocuments({ tags: tagId })) > skipAmount + pageSize;
    const questions = tag.questions;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();
    const TopTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: "$questions" },
        },
      },
      {
        $sort: {
          numberOfQuestions: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    return TopTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
