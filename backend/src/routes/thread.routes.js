import {
    createThread,
    getReplies,
    getThread,
    getThreadList,
    uploadComment,
    uploadReply,
    upvoteThread,
    saveThread,
    deleteThread,
} from "../controllers/thread.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/create-thread").post(verifyJWT, createThread);
router.route("/get-thread-list").get(verifyJWT, getThreadList);
router.route("/get-thread").get(verifyJWT, getThread);
router.route("/upvote-thread").get(verifyJWT, upvoteThread);
router.route("/upload-comment").post(verifyJWT, uploadComment);
router.route("/upload-reply").post(verifyJWT, uploadReply);
router.route("/get-replies").get(verifyJWT, getReplies);
router.route("/save-thread").patch(verifyJWT, saveThread);
router.route("/unsave-thread").patch(verifyJWT, saveThread);
router.route("/delete-thread").delete(verifyJWT, deleteThread);

export default router;
