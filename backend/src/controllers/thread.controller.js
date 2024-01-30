import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Thread } from "../models/thread.model.js";

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


const getThreadList = asyncHandler(async (req,res)=>{
    console.log(req.query)
    res.status(200).send("ok");
});
export { createThread,getThreadList };
