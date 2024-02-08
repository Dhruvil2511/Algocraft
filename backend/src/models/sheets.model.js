import mongoose, { Schema } from "mongoose";

const sheetsSchema = new mongoose.Schema(
    {
        sheet_author: String,
        sheet_data: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
    },
    { timestamps: true }
);

export const Sheet = mongoose.model("Sheet", sheetsSchema);
