import { asyncHandler } from "../utils/asyncHandler.js";
import { Newsletter } from "../models/newsletter.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
const addUserToNewsLetter = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (await Newsletter.find({ email: email }))
        return res.status(400).json(new ApiError(400, "error", "Already subscribed"));

    const newsletter = new Newsletter({ email: email });
    await newsletter.save();

    return res.status(200).json(new ApiResponse(200, newsletter, "done"));
});

export { addUserToNewsLetter };
