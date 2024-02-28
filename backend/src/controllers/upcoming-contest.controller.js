import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getUpcomingContest = asyncHandler(async (_, res) => {
    await axios
        .get("https://clist.by/api/v4/json/contest/", {
            params: {
                username: "manesh3107",
                api_key: process.env.CONTEST_API_KEY,
                upcoming: true,
            },
        })
        .then((response) => {
            if (response.status === 200) {
                const contestData = response.data;
                return res.status(200).json(new ApiResponse(200, contestData, "Data Retrived Successfully"));
            }
        })
        .catch((error) => {
            console.error("Oops..! Error fetching Upcomming  Contests", error);
            res.status(500).send(
                new ApiError({
                    statusCode: 400,
                    message: error.message,
                    userMessage: error.message,
                    errors: error,
                    stack: process.env.NODE_ENV === "production" ? "🙊" : error.stack,
                })
            );
        });
});

export { getUpcomingContest };
