import "dotenv/config";
import connectDB from "./db/db.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 6969, () => {
            console.log(`Server is running at port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed!", error);
    });
