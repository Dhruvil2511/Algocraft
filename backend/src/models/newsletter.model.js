import mongoose, { Schema } from "mongoose";

const newsletterSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
