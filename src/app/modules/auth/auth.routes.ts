import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post(
  "/social-login",
  validateRequest(authValidation.authLoginSchema),
  authController.authLogin,
);
router.get("/profile", auth(), authController.myProfile);
router.post("/send-otp", authController.sendForgotPasswordOtp);
router.post("/verify-otp", authController.verifyForgotPasswordOtpCode);
router.patch("/reset-password", auth(), authController.resetPassword);
router.patch(
  "/profile",
  auth(),
  fileUploader.profileImage,
  parseBodyData,
  authController.updateProfile,
);
router.patch("/change-password", auth(), authController.changePassword);
router.delete("/delete-account", auth(), authController.deleteAccount);
router.post(
  "/update/user-location",
  auth(),
  validateRequest(authValidation.locationUpdateSchema),
  authController.updateUserLocation,
);

router.put(
  "/add-photo-to-gallery",
  auth(UserRole.Player, UserRole.Coach),
  fileUploader.galleryImage,
  authController.addPhotoToGallery,
);

export const authRoute = router;
