import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const optionalAuth = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        req.user = null; 
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (user) req.user = user;
        else req.user = null;
    } catch (error) {
        req.user = null; 
    }
    next();
});
