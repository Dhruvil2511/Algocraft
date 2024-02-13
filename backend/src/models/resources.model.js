import mongoose, { Schema } from "mongoose";

const resourcesSchema = new mongoose.Schema(
    {
        title: String,
        link: String,
        img: String,
        description: String,
    },
    { timestamps: true }
);
export const Resource = mongoose.model("Resource", resourcesSchema);
