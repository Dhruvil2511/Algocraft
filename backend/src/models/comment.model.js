import mongoose, { Schema } from "mongoose";

const repliesSchema = new mongoose.Schema(
    {
        repliedContent: {
            type: String,
            maxLength: [1024, "Max length is 1024"],
        },
        repliedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            maxLength: [8024, "Max length is 8024"],
        },
        threadId: {
            type: Schema.Types.ObjectId,
            ref: "Thread",
        },
        commentBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        replies: [repliesSchema],
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
