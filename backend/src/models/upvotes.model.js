import mongoose from "mongoose";
import mongooseAggregatePagniate from "mongoose-aggregate-paginate-v2";

const upvoteSchema = new mongoose.Schema(
    {
        upvotedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        threadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    },
    { timestamps: true }
);
upvoteSchema.plugin(mongooseAggregatePagniate);

export const Upvote = mongoose.model("Upvote", upvoteSchema);
