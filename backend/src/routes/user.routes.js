import { Router } from "express";
import {
    changePassword,
    deleteAccount,
    getCurrentUser,
    getUserCreatedThreads,
    getUserProfile,
    getUserSavedQuestions,
    getUserSavedThread,
    getUserSolvedQuestions,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    verifyEmail,
    updateAccountDetails,
    updateAvatar,
    resendVerification,
    googleAuth
} from "../controllers/user.controller.js";

const router = Router();
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email").get(verifyEmail)
router.route("/resend-verification").get(resendVerification)
router.route("/google-user").post(googleAuth)
// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar);
router.route("/get-user-profile").get(getUserProfile);
router.route("/get-created-threads").get(getUserCreatedThreads);
router.route("/get-solved-questions").get(getUserSolvedQuestions);
router.route("/get-saved-threads").get(verifyJWT, getUserSavedThread);
router.route("/get-saved-questions").get(verifyJWT, getUserSavedQuestions);
router.route("/delete-account").delete(verifyJWT,deleteAccount);
export default router;
