import mongoose, { Schema } from "mongoose";
import mongooseAggregatePagniate from "mongoose-aggregate-paginate-v2";

const threadSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: [100, "Max length is 100 char"],
            minLength: [5, "min length is 5 char"],
        },
        category: {
            type: String,
            required: true,
            enum: ["all", "interview-experience", "algorithms", "development", "miscellaneous"],
        },
        tags: {
            type: Array,
            maxLength: [3, "max tags are 3"],
        },
        content: {
            type: String,
            required: true,
            minLength: [10, "Min Length is 10 "],
        },
        views: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        upvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        uploader: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

threadSchema.plugin(mongooseAggregatePagniate);

export const Thread = mongoose.model("Thread", threadSchema);
