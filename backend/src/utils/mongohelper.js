import mongoose from "mongoose";
// import { questions as questionsData } from "../../public/questions.js";

import "dotenv/config.js";
import { Resource } from "../models/resources.model.js";
// MongoDB connection URI
const mongoURI = process.env.MONGODB_URI ;
console.log(mongoURI);

const obj = {
    title: "Mongo DB Notes",
    link: "https://drive.google.com/file/d/1oe8WRXSr525MItEu7w7NtHAyQ4bRGr6w/view?usp=sharing",
    img: "https://res.cloudinary.com/dvspdkrk5/image/upload/v1707849857/kuzt9r42or1fxvlq2-Meta_Generic_bvvoiu.png",
    description:"A versatile and efficient database solution designed for modern applications, offering flexible document-based storage and powerful querying capabilities. Organize, store, and retrieve your notes seamlessly with MongoDB's scalable and high-performance platform, empowering collaboration and innovation."
};
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
    try {
        const qs = new Resource(obj);
        await qs.save();
        console.log("Resource saved successfully.");
    } catch (error) {
        console.error("Error saving resource:", error);
    }
}
