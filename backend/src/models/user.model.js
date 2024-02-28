import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        fullname: {
            type: String,
            // required: true,
            trim: true,
        },
        avatar: {
            type: String,
            // required: true,
        },
        location: {
            type: String,
        },
        github: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        bookmarkedQuestions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        solvedQuestions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        refreshToken: {
            type: String,
        },
        threadsCreated: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thread",
            },
        ],
        threadsSaved: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thread",
            },
        ],
        isActive: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: null,
        },
        googleUser: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// mongoose middleware to process data just before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// creating custom method for our schema to check password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const User = mongoose.model("User", userSchema);
