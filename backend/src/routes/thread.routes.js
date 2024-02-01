import { createThread, getThread, getThreadList, uploadComment, upvoteThread } from "../controllers/thread.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/create-thread").post(verifyJWT, createThread);
router.route("/get-thread-list").get(verifyJWT, getThreadList);
router.route("/get-thread").get(verifyJWT, getThread);
router.route("/upvote-thread").get(verifyJWT, upvoteThread);
router.route("/upload-comment").post(verifyJWT, uploadComment);

export default router;
