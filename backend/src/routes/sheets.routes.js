import { getSheet, markQuestionAsDone, saveQuestion } from "../controllers/sheets.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.route("/get-sheet").get(getSheet);
router.route("/save-question").patch(verifyJWT, saveQuestion);
router.route("/mark-question").patch(verifyJWT, markQuestionAsDone);
export default router;
