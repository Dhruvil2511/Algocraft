import mongoose, { Schema } from "mongoose";

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
    },
    { timestamps: true }
);
export const Question = mongoose.model("Question", questionSchema);
