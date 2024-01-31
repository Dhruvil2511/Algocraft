import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Thread } from "../models/thread.model.js";
import { ObjectId } from "mongodb";
const createThread = asyncHandler(async (req, res) => {
    const { title, category, tags, content } = req.body;

    const threadCreated = await Thread.create({
        title: title,
        category: category,
        tags: tags,
        content: content,
        uploader: req.user?._id,
    });

    if (!threadCreated) return res.status(500).json(new ApiError(500, "Internal Error", "Error creating thread"));

    return res.status(200).json(new ApiResponse(200, threadCreated, "Thread created successfully"));
});

const getThreadList = asyncHandler(async (req, res) => {
    // todo:-> add express-validator to validate express query inorder to protect from nosql injection
    const { category, search } = req.query;
    let { page, limit } = req.query;

    try {
        page = Number(page) || 1;
        limit = Number(limit) || 10;
    } catch (error) {
        res.status(400).json(new ApiError(400, "error", "Only number allowed"));
    }

    let skip = (page - 1) * limit;

    let pipeline = [];

    // console.log(search);
    if (search !== "")
        pipeline.push({
            $search: {
                index: "default",
                text: {
                    query: search,
                    path: "title",
                },
            },
        });
    else if (category !== "all") pipeline.push({ $match: { category: category } });

    const threads = await Thread.aggregate([
        ...pipeline,
        {
            $lookup: {
                from: "users",
                localField: "uploader",
                foreignField: "_id",
                as: "uploader",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                uploader: {
                    $first: "$uploader",
                },
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ]);

    res.status(200).json(new ApiResponse(200, threads, "Threads fetched successfully"));
});

const getThread = asyncHandler(async (req, res) => {
    const threadId = req.query?.threadId;
    const thread = await Thread.aggregate([
        {
            $match: {
                _id: new ObjectId(threadId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "uploader",
                foreignField: "_id",
                as: "uploader",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                uploader: {
                    $first: "$uploader",
                },
            },
        },
    ]);
    res.status(200).json(new ApiResponse(200, thread[0], "Thread fetched successfully"));
});

const upvoteThread = asyncHandler(async (req, res) => {


});
export { createThread, getThreadList, getThread ,upvoteThread};
