import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import joi from "joi";
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

const generateAccessAndRefreshToken = asyncHandler(async (userId) => {
    const user = await User.findById({ userId });
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
});
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
                errors: error,
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

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

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
            $set: { refreshToken: undefined },
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

export { registerUser, loginUser, logoutUser, refreshAccessToken };
