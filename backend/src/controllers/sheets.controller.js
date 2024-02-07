import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Sheet } from "../models/sheets.model.js";

const getSheet = asyncHandler(async (req, res) => {
    const sheet_author = req.query.sheet_author;
    let page = req.query.page;
    let limit = req.query.limit;
    const difficulty = req.query.difficulty;
    const selectedTags = req.query.selectedTags;

    console.log(selectedTags);
    const matchQuery = {
        sheet_author: sheet_author,
        "sheet_data.difficulty": difficulty.trim() !== "" ? difficulty : { $exists: true }, // Check if difficulty is provided, if not, match any
        "sheet_data.problemTag":
            selectedTags !== undefined && selectedTags.length > 0 ? { $in: selectedTags } : { $exists: true },
    };

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json(new ApiError(400, "error", "Only numbers allowed"));
    }

    let skip = (page - 1) * limit;

    const sheet = await Sheet.aggregate([
        {
            $unwind: "$sheet_data",
        },
        {
            $match: matchQuery,
        },
        { $skip: skip },
        { $limit: limit },
        {
            $group: {
                _id: "$_id",
                sheet_data: { $push: "$sheet_data" },
            },
        },
        {
            $project: {
                sheet_author: 1,
                sheet_data: 1,
            },
        },
    ]);
    

    if (!sheet || sheet.length === 0) {
        return res.status(404).json(new ApiError(404, "error", "Sheets not found"));
    }
    res.status(200).json(new ApiResponse(200, sheet[0], "Sheet fetched"));
});

export { getSheet };
