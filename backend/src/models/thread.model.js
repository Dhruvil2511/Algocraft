import mongoose, { Schema } from "mongoose";
import mongooseAggregatePagniate from "mongoose-aggregate-paginate-v2";

const threadSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: [25, "Max length is 25 char"],
            maxLength: [5, "min length is 5 char"],
        },
        category: {
            type: String,
            required: true,
            enum: ["interview-experience", "algorithms", "devlopment", "miscellaneous"],
        },
        content: {
            type: String,
            required: true,
            minLength: [10, "Min Length is 10 "],
        },
        views: {
            type: Number,
            default: 0,
        },
        uploader: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

threadSchema.plugin(mongooseAggregatePagniate);

export const Thread = mongoose.model("Thread", threadSchema);
