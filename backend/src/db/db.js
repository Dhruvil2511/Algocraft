import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
    try {
        const connectionObject = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected. DB HOST: ${connectionObject.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed: ", error);
        process.exit(1);
    }
}

export default connectDB;
