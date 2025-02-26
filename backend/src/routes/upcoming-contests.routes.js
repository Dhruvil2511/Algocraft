import { getUpcomingContest } from "../controllers/upcoming-contest.controller.js";
import { Router } from "express";
const router = Router();

router.route("/upcoming-contests").get(getUpcomingContest);

export default router;
