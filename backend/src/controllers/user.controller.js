import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // res.send({ email, password, username.toLowerCase() });
    // validation
    // check if user already exists (username and email)
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { email, password, username } = req.body;
    console.log(email, password, username);

    if ([email, password, username].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "Email is already registered");
    }

    const usernameAvailable = await User.findOne({ username });

    if (usernameAvailable) {
        throw new ApiError(409, "Username already taken!");
    }
    const user = await User.create({ email, password, username: username.toLowerCase() });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user!");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered succesfully."));
});

export { registerUser };
