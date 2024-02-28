import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json(new ApiError(403, "Unauthorized request", "Unauthorized request"));
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            return res.status(403).json(new ApiError(403, "Unauthorized request", "Unauthorized request"));
        }
        req.user = user;
        console.log(user.email, "->", req.originalUrl);
        next();
    } catch (error) {
        // Handle token verification errors
        console.log(error);
        return res.status(403).json(new ApiError(403, "Invalid token", "Invalid token"));
    }
});
