
import { Router } from "express";
import { getResources } from "../controllers/resources.controller.js";

const router = Router();

router.route("/get-resources").get(getResources);
export default router;
