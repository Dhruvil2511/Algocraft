import { Router } from "express";
import {
    changePassword,
    getCurrentUser,
    getUserProfile,
    getUserSavedThread,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateAvatar,
} from "../controllers/user.controller.js";

const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/:username").get(verifyJWT, getUserProfile);
router.route("/saved-thread").get(verifyJWT, getUserSavedThread);

export default router;
