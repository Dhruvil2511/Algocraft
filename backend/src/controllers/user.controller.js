import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import joi from "joi";

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

export { registerUser };
