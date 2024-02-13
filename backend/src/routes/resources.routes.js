
import { Router } from "express";
import { getResources } from "../controllers/resources.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-resources").get(verifyJWT,getResources);
export default router;
