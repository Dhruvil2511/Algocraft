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

const questionSchema = new mongoose.Schema(
    {
        title: String,
        link: String,
        difficulty: String,
        problemTags: [],
        companyTags: [],
        userInteractions: [userInteractionsSchema],
    },
    { timestamps: true }
);

const sheetsSchema = new mongoose.Schema(
    {
        sheet_author: String,
        sheet_content: [questionSchema],
    },
    { timestamps: true }
);

export const Sheet = mongoose.model("Sheet", sheetsSchema);
export const UserInteraction = mongoose.model("UserInteraction", userInteractionsSchema);
