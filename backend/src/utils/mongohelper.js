import mongoose from "mongoose";
import { questions as questionsData } from "../../public/questions.js";
import { Question } from "../models/question.model.js";
import { Sheet } from "../models/sheets.model.js";
import "dotenv/config.js"
// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
    .connect(mongoURI + "/algocraft", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB successfully");
        // Call your saveData function here to ensure it's executed after the connection is established
        saveData();
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

async function saveData() {
    const sheet = new Sheet({
        sheet_author: "love_babbar",
        sheet_data: [],
    });
    for (const questionData of questionsData) {
        try {
            const question = new Question({
                title: questionData.title,
                problemlink: questionData.problemlink,
                difficulty: questionData.difficulty,
                problemTags: questionData.problemTag,
                questionFrom: sheet._id,
            });

            await question.save();
            sheet.sheet_data.push(question._id);

            console.log(`Question "${questionData.title}" saved successfully.`);
        } catch (error) {
            console.error(`Error saving question "${questionData.title}":`, error);
        }
    }
    await sheet.save();
}
