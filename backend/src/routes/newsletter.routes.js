
import { Router } from "express";
import { addUserToNewsLetter } from "../controllers/newsletter.controller.js";

const router = Router();

router.route("/add-user").post(addUserToNewsLetter);
export default router;
