import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Sheet } from "../models/sheets.model.js";
import { Question } from "../models/question.model.js";
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";

const getSheet = asyncHandler(async (req, res) => {
    const sheet_author = req.query.sheet_author;
    let page = req.query.page;
    let limit = req.query.limit;
    const difficulty = req.query.difficulty;
    const selectedTags = req.query.selectedTags;
    const status = req.query.status;


    await new Promise((resolve) => optionalAuth(req, res, resolve)).catch((err) => { }); 
    const userId = req?.user?._id;
    const user = await User.findById(userId);
    
    const filterQuery = {
        "sheet_data.difficulty": difficulty.trim() !== "" ? difficulty : { $exists: true }, // Check if difficulty is provided, if not, match any
        "sheet_data.problemTags":
            selectedTags !== undefined && selectedTags.length > 0 ? { $in: selectedTags } : { $exists: true },
    };
    let statusMatchQuery = { $exists: true };
    if(user !== null) {
        if (status === "Solved") {
            statusMatchQuery = { $in: user.solvedQuestions }; 
        } else if (status === "Marked") {
            statusMatchQuery = { $in: user.bookmarkedQuestions }; 
        }
    }

    filterQuery["sheet_data._id"] = statusMatchQuery;

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json(new ApiError(400, "error", "Only numbers allowed"));
    }

    let skip = (page - 1) * limit;

    let sheet = await Sheet.aggregate([
        {
            $match: {
                sheet_author: sheet_author,
            },
        },
        {
            $lookup: {
                from: "questions",
                localField: "sheet_data",
                foreignField: "_id",
                as: "sheet_data",
            },
        },
        {
            $unwind: "$sheet_data",
        },
        {
            $match: filterQuery,
        },
        {
            $group: {
                _id: "$_id",
                sheet_author: { $first: "$sheet_author" },
                sheet_data: { $push: "$sheet_data" },
                totalQuestions: { $first: "$totalQuestions" },
                totalEasy: { $first: "$totalEasy" },
                totalMedium: { $first: "$totalMedium" },
                totalHard: { $first: "$totalHard" },
            },
        },
        {
            $project: {
                sheet_author: 1,
                sheet_data: {
                    $slice: ["$sheet_data", skip, limit],
                },
                totalQuestions: 1,
                totalEasy: 1,
                totalMedium: 1,
                totalHard: 1,
            },
        },
    ]);

    if (!sheet || sheet.length === 0) {
        return res.status(404).json(new ApiError(404, "error", "Sheets not found"));
    }
    if (sheet[0].sheet_data.length === 0) return res.status(404).json(new ApiError(404, "error", "No more questions"));

    res.status(200).json(new ApiResponse(200, sheet[0], "Sheet fetched"));
});

const saveQuestion = asyncHandler(async (req, res) => {
    const { questionId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const userIndex = user.bookmarkedQuestions.findIndex((ques) => ques.equals(questionId));

    let message = "";
    if (userIndex !== -1) {
        user.bookmarkedQuestions.splice(userIndex, 1);
        message = "unsave";
    } else {
        user.bookmarkedQuestions.push(questionId);
        message = "save";
    }

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, user, message));

    // res.send(200);
});

const markQuestionAsDone = asyncHandler(async (req, res) => {
    const { questionId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const userIndex = user.solvedQuestions.findIndex((ques) => ques.equals(questionId));

    let message = "";
    if (userIndex !== -1) {
        user.solvedQuestions.splice(userIndex, 1);
        message = "unsave";
    } else {
        user.solvedQuestions.push(questionId);
        message = "save";
    }

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, user, message));
});

export { getSheet, saveQuestion, markQuestionAsDone };
