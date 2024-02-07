import { getSheet } from "../controllers/sheets.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.route("/get-sheet").get(verifyJWT, getSheet);

export default router;
