import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// use method mostly use for configurations or middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); // to encode the url with its param
app.use(express.static("public")); // to serve static files
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import threadRouter from "./routes/thread.routes.js";
import upcomingContestRouter from "./routes/upcoming-contests.routes.js";
// routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/threads", threadRouter);
app.use("/api/v1/contests",upcomingContestRouter)


export { app };
