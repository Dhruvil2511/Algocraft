import { createThread, getThreadList } from "../controllers/thread.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/create-thread").post(verifyJWT,createThread);
router.route("/get-thread-list").get(verifyJWT,getThreadList);



export default router;
