import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
    {
        following: {
            // one to whom he is following
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        follower: {
            // one who is following
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Follow = mongoose.Model("Follow", followSchema);
