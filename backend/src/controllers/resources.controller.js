import { asyncHandler } from "../utils/asyncHandler.js";
import { Resource } from "../models/resources.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const getResources = asyncHandler(async (req, res) => {
    const { search } = req.query;
    let { page, limit } = req.query;

    try {
        page = Number(page) || 1;
        limit = Number(limit) || 10;
    } catch (error) {
        return res.status(400).json(new ApiError(400, "error", "Only number allowed"));
    }

    let pipeline = [];

    if (search.trim() !== "") {
        pipeline.push({
            $search: {
                index: "resources",
                text: {
                    query: search,
                    path: {
                        wildcard: "*",
                    },
                },
            },
        });
    } else {
        pipeline.push({ $match: {} });
    }

    const skip = (page - 1) * limit;
    const resources = await Resource.aggregate([
        ...pipeline,
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ]);
    
    if (!resources || resources.length === 0) {
        return res.status(404).json(new ApiError({statusCode: 404,message: "",userMessage: "No more resources to show"}));
    }
    return res.status(200).json(new ApiResponse(200, resources, "Resources fetched successfully"));
});

export { getResources };
