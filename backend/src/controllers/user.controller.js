import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import joi from "joi";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

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
    const userId = req.user._id;
    const user = await User.findById(userId).populate("solvedQuestions");
    return res.status(200).json(new ApiResponse(200, { user: user }, "User fetched"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const update = {};

    const { fullname, username, location, github, linkedin } = req.body;

    if (fullname) update.fullname = fullname;
    if (username) update.username = username;
    if (location) update.location = location;
    if (github) update.github = github;
    if (linkedin) update.linkedin = linkedin;

    console.log("update data", update);
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
        return res.status(400).json(new ApiError(400, "username is taken", "username is taken"));
    }

    const user = await User.findByIdAndUpdate(req.user?._id, update, { new: true }).select("-password");

    // console.log(user);
    return res.status(200).json(new ApiResponse(200, user, "User details updated successfully!"));
});
const updateAvatar = asyncHandler(async (req, res) => {
    // return res.json(req.body);
    const avatarLocalPath = req.file?.path;
    console.log(req.file)
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is missing", "Avatar is missing");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(avatar)
    if (!avatar.url) throw new ApiError(404, "Error", "Error while uploading Avatar");

    const user = await User.findByIdAndUpdate(req.user?._id, { $set: { avatar: avatar.eager[0].url } }, { new: true }).select(
        "-password"
    );
    
    return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
    const username = req.query.username;

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
                fullname: 1,
                username: 1,
                location: 1,
                github: 1,
                linkedin: 1,
                followers: 1,
                following: 1,
                avatar: 1,
                threadsCreated: 1,
                threadsSaved: 1,
                bookmarkedQuestions: 1,
                solvedQuestions: 1,
            },
        },
    ]);
    username === req.user?.username ? (userDetails[0].owner = true) : (userDetails[0].owner = false);

    if (!userDetails?.length) return res.status(404).json(new ApiError(200, "Error", "User doesn't exists"));
    userDetails[0].password = "Nice try mf!🤣";
    return res.status(200).json(new ApiResponse(200, userDetails[0], "User details found successfully"));
});

const getUserCreatedThreads = asyncHandler(async (req, res) => {
    const username = req.query.username;

    const user = await User.findOne({ username: username }).populate("threadsCreated").exec();

    if (!user) throw new ApiError(404, "Not found", "User hasn't created any thread yet");

    return res.status(200).json(new ApiResponse(200, user, "Threads fetched "));
});
const getUserSavedThread = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("threadsSaved").exec();
    console.log(user);

    if (!user) throw new ApiError(404, "Not found", "User hasn't saved any thread yet");

    return res.status(200).json(new ApiResponse(200, user, "Threads fetched "));
});

const getUserSavedQuestions = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate("bookmarkedQuestions");

        return res.status(200).json(new ApiResponse(200, user?.bookmarkedQuestions, "Questions fetched "));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
const getUserSolvedQuestions = asyncHandler(async (req, res) => {
    const username = req.query.userId;
    try {
        const user = await User.find({ username: username }).populate("solvedQuestions");

        return res.status(200).json(new ApiResponse(200, user[0].solvedQuestions, "Questions fetched "));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


const deleteAccount = asyncHandler(async(req,res)=>{

    const userId = req.user?._id;

    if(!userId) return res.status(401).json(new ApiError(401,"error","Error  userId not found"));

    await User.findByIdAndDelete(userId);

    return res.status(200).json(new ApiResponse(200,{},"Account deleted successfully"))
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
    getUserCreatedThreads,
    getUserSavedQuestions,
    getUserSolvedQuestions,
    deleteAccount
};
