import { getUpcomingContest } from "../controllers/upcoming-contest.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/upcoming-contests").get(verifyJWT, getUpcomingContest);

export default router;
