import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Thread } from "../models/thread.model.js";
import { ObjectId } from "mongodb";
import { Comment } from "../models/comment.model.js";

const createThread = asyncHandler(async (req, res) => {
    const { title, category, tags, content } = req.body;
    const userId = req.user?._id;

    const threadCreated = await Thread.create({
        title: title,
        category: category,
        tags: tags,
        content: content,
        uploader: req.user?._id,
    });

    if (!threadCreated) return res.status(500).json(new ApiError(500, "Internal Error", "Error creating thread"));

    await User.findByIdAndUpdate(userId, { $push: { threadsCreated: threadCreated._id } }, { new: true });

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

    // console.log(threads);

    res.status(200).json(new ApiResponse(200, threads, "Threads fetched successfully"));
});

const getThread = asyncHandler(async (req, res) => {
    const threadId = new ObjectId(req.query?.threadId);
    const userId = req.user._id;

    const threads = await Thread.aggregate([
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
            $lookup: {
                from: "comments",
                localField: "comments",
                foreignField: "_id",
                as: "comments",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "commentBy",
                            foreignField: "_id",
                            as: "commentBy",
                        },
                    },
                    {
                        $addFields: {
                            commentBy: {
                                $first: "$commentBy",
                            },
                        },
                    },
                ],
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
                upvotes: 1,
                comments: 1,
                uploader: {
                    _id: 1,
                    username: 1,
                    avatar: 1,
                    fullname:1
                },
                upvotes: {
                    _id: 1,
                },
            },
        },
    ]);

    let message = "";
    const userViewedOrNot = threads[0].views?.findIndex((viewer) => viewer.equals(userId));
    const likedOrNot = threads[0].upvotes?.findIndex((upvote) => upvote._id.equals(userId));

    const user = await User.findById(userId);
    const savedOrNot = user.threadsSaved.findIndex((saved) => saved._id.equals(threadId));

    if (userViewedOrNot === -1) {
        threads[0].views.push(user);
        await Thread.updateOne({ _id: threadId }, { views: threads[0].views });
    }

    const responseData = {
        thread: threads[0],
        upvotedOrNot: likedOrNot === -1 ? false : true,
        savedOrNot: savedOrNot === -1 ? false : true,
    };
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

    if (userIndex !== -1) {
        thread.upvotes.splice(userIndex, 1);
        message = "disliked";
        ``;
    } else {
        thread.upvotes.push(user);
        message = "liked";
    }

    await Thread.updateOne({ _id: threadId }, { upvotes: thread.upvotes });

    res.status(200).json(new ApiResponse(200, thread, message));
});

const uploadComment = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { content } = req.body;
    const threadId = req.query.threadId;
    const thread = await Thread.findById(threadId);

    if (!thread) {
        return res.status(404).json({ success: false, message: "Thread not found" });
    }

    const incomingComment = new Comment({
        content: content,
        threadId: new ObjectId(threadId),
        commentBy: new ObjectId(userId),
    });

    await incomingComment.save();

    thread.comments.push(incomingComment);
    await thread.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, incomingComment, "comment added"));
});

const uploadReply = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;
    const { repliedContent } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) throw new ApiError(404, "error", "Wrong comment-id");

    await comment.replies.push({ repliedContent: repliedContent, repliedBy: req.user?._id });

    await comment.save();
    // console.log(comment);

    return res.status(200).json(new ApiResponse(200, comment, "Replied successfully"));
});

const getReplies = asyncHandler(async (req, res) => {
    const commentId = req.query.comment_id;

    const comment = await Comment.findById(commentId)
        .populate({
            path: "replies",
            populate: {
                path: "repliedBy",
                model: "User",
            },
        })
        .exec();

    return res.status(200).json(new ApiResponse(200, comment, "Replies fetched success"));
});

const saveThread = asyncHandler(async (req, res) => {
    const threadId = req.body.threadId;
    const userId = req.user._id;

    if (!threadId) throw new ApiError(401, "Error", "Error with thread id");

    const user = await User.findById(userId);
    const userIndex = await user.threadsSaved.findIndex((thread) => thread.equals(threadId));

    let message = "";
    if (userIndex !== -1) {
        user.threadsSaved.splice(userIndex, 1);
        message = "unsave";
    } else {
        user.threadsSaved.push(threadId);
        message = "save";
    }

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, user, message));
});

const deleteThread = asyncHandler(async (req, res) => {
    const threadId = req.query.threadId;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { $pull: { threadsCreated: { _id: new ObjectId(threadId) } } });
    await Thread.findByIdAndDelete(threadId);

    return res.status(200).json(new ApiResponse(200, {}, "Successfully deleted"));
});
export { createThread, getThreadList, getThread, upvoteThread, uploadComment, uploadReply, getReplies, saveThread,deleteThread };
