import mongoose, { Schema } from "mongoose";

const userInteractionsSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        status: { type: String, enum: ["finished", "later", "pending"] },
    },
    { timestamps: true }
);

export const UserInteraction = mongoose.model("UserInteraction", userInteractionsSchema);
const questionSchema = new mongoose.Schema(
    {
        title: String,
        problemlink: String,
        difficulty: String,
        questionFrom: {
            type: Schema.Types.ObjectId,
            ref: "Sheet",
        },
        problemTags: {
            type: [String], // Array of strings
            default: [],
        },
        companyTags: {
            type: [String], // Array of strings
            default: [],
        },
        userInteractions: [userInteractionsSchema],
    },
    { timestamps: true }
);
export const Question = mongoose.model("Question", questionSchema);
