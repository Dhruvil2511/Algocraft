import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Thread } from "../models/thread.model.js";
import { ObjectId } from "mongodb";
import { Upvote } from "../models/upvotes.model.js";
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

    console.log(threads);

    res.status(200).json(new ApiResponse(200, threads, "Threads fetched successfully"));
});

const getThread = asyncHandler(async (req, res) => {
    const threadId = req.query?.threadId;
    const user = req.user._id;

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
            },
        },
        {
            $unwind: "$uploader",
        },
        {
            $lookup: {
                from: "users",
                localField: "upvotes",
                foreignField: "_id",
                as: "upvotes",
            },
        },
        {
            $project: {
                title: 1,
                category: 1,
                tags: 1,
                content: 1,
                views: 1,
                createdAt: 1,
                upvotes:1,
                uploader: {
                    _id: 1,
                    username: 1,
                    avatar: 1,
                },
                upvotes: {
                    _id: 1,
                },
                
            },
        },
    ]);

    let message = "";

    const userViewedOrNot = thread[0].views?.findIndex((viewer) => viewer.equals(user));
    const likedOrNot = thread[0].upvotes?.findIndex((upvote) => upvote._id.equals(user));

    if (userViewedOrNot === -1) {
        thread[0].views.push(user);
        await Thread.updateOne({ _id: threadId }, { views: thread[0].views });
    }

    const responseData = {
        thread:thread[0],
        upvotedOrNot :likedOrNot === -1 ?false:true
    }
    res.status(200).json(new ApiResponse(200, responseData, "Thread fetched successfully" + message));
});

const upvoteThread = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const threadId = req.query?.threadId;
    const thread = await Thread.findById(threadId);

    if (!thread) {
        return res.status(404).json(new ApiResponse(404, null, "Thread not found"));
    }

    const userIndex = thread.upvotes.findIndex((upvote) => upvote.equals(user));
    let message = "";
    console.log(userIndex);
    if (userIndex !== -1) {
        thread.upvotes.splice(userIndex, 1);
        message = "disliked";``
    } else {
        thread.upvotes.push(user);
        message = "liked";
    }

    await Thread.updateOne({ _id: threadId }, { upvotes: thread.upvotes });


    res.status(200).json(new ApiResponse(200, thread, message));
});
export { createThread, getThreadList, getThread, upvoteThread };
