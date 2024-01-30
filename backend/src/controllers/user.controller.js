import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import joi from "joi";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const cookieOptions = {
    // added this so that cookie can only be modified by server and not client
    httpOnly: true,
    secure: true,
};

const registrationSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    fullname: joi.string(),
    password: joi
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
        .message({
            "string.pattern.base":
                "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character.",
        }),
});

const registerUser = asyncHandler(async (req, res) => {
    // check if user already exists (username and email)
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { email, password, username } = req.body;
    console.log(email, password, username);

    const { error } = registrationSchema.validate({
        username,
        email,
        password,
    });

    if (error) {
        return res.status(400).json(
            new ApiError({
                statusCode: 400,
                message: error.message,
                userMessage: error.message,
                errors: error,
                stack: process.env.NODE_ENV === "production" ? "🙊" : error.stack,
            })
        );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        let errorMessage = "";
        if (existingUser.email === email) errorMessage = "Email is already registered.";
        else if (existingUser.username === username) errorMessage = "Username is already taken.";

        return res.status(400).json(
            new ApiError({
                statusCode: 400,
                message: errorMessage,
                userMessage: errorMessage,
                errors: error,
                stack: process.env.NODE_ENV === "production" ? "🙊" : error?.stack,
            })
        );
    }

    const user = await User.create({
        email,
        password,
        username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        return res.status(500).json(
            new ApiError({
                statusCode: 500,
                message: "Error creating user.",
                userMessage: "Error creating user.",
                errors: error,
                stack: process.env.NODE_ENV === "production" ? "🙊" : error?.stack,
            })
        );
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered succesfully."));
});

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "error", "Internal server error");
    }
};
const loginUser = asyncHandler(async (req, res) => {
    // req body  -> data
    // check if User,Email exists
    // find the User if exists
    // if user exists Check the password of user if its correct
    // generate accessToken and refresh token
    // send token as secure cookies
    // login successfull

    const { email, username, password } = req.body;

    if (!(username || email)) {
        return res.status(400).json(
            new ApiError({
                statusCode: 400,
                message: "Email or username is required!",
                userMessage: "Email or username is required!",
                errors: error,
                stack: process.env.NODE_ENV === "production" ? "🙊" : error?.stack,
            })
        );
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
        return res.status(404).json(
            new ApiError({
                statusCode: 404,
                message: "User is not registered!",
                userMessage: "User is not registered!",
                stack: process.env.NODE_ENV === "production" ? "🙊" : error?.stack,
            })
        );
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(400).json(
            new ApiError({
                statusCode: 404,
                message: "Password is incorrect!",
                userMessage: "Invalid user credentials",
                errors: error,
                stack: process.env.NODE_ENV === "production" ? "🙊" : error?.stack,
            })
        );
    }
    console.log(user._id);
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    console.log(loggedInUser);
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User Logged in Successfully."));
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 },
        },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshAccessToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh token expired or invalid");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user.isPasswordCorrect(oldPassword)) {
        throw new ApiError(401, "Old password doesn't match");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully!"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, username, location, githubLink, linkedinLink } = req.body;

    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
        return res.status(400).json(new ApiError(400, "username is taken", "username is taken"));
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $setOnInsert: {
                fullName: fullName,
                username: username,
                email: email,
                location: location,
                githubLink: githubLink,
                linkedinLink: linkedinLink,
            },
        },
        { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "User details updated successfully!"));
});
const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is missing", "Avatar is missing");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) throw new ApiError(404, "Error", "Error while uploading Avatar");

    const user = await User.findByIdAndUpdate(req.user._id, { $set: { avatar: avatar.url } }, { new: true }).select(
        "-password"
    );

    return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim) throw new ApiError(400, "error", "username is missing");

    const userDetails = await User.aggregate([
        {
            $match: { username: username?.toLowerCase() },
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "following",
                as: "followers",
            },
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "followers",
                as: "following",
            },
        },
        {
            $addFields: {
                isFollowed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$followers.follower"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                location: 1,
                githubLink: 1,
                linkedinLink: 1,
                followers: 1,
                following: 1,
                avatar: 1,
            },
        },
    ]);

    if (!userDetails?.length) return res.status(404).json(new ApiError(200, "Error", "User doesn't exists"));

    console.log(userDetails);
    return res.status(200).json(new ApiResponse(200, userDetails[0], "User details found successfully"));
});

const getUserSavedThread = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "threads",
                localField: "threadSaved",
                foreignField: "_id",
                as: "savedThread",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "uploader",
                            foreignField: "_id",
                            as: "uploader",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
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
                ],
            },
        },
    ]);

    return res.status(200).json(new ApiResponse(200, user[0].savedThread, "saved threads fetched successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
    updateAvatar,
    changePassword,
    getUserProfile,
    getUserSavedThread,
};
