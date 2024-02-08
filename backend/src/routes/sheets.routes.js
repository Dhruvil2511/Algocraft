import { getSheet,saveQuestion } from "../controllers/sheets.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.route("/get-sheet").get(verifyJWT, getSheet);
router.route("/save-question").patch(verifyJWT,saveQuestion);

export default router;
