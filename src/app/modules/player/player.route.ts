import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { playerController } from "./player.controller";
import { playerValidation } from "./player.validation";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/set-profile",
  auth(UserRole.Player),
  fileUploader.uploadMultiple,
  parseBodyData,
  validateRequest(playerValidation.playerProfileSchema),
  playerController.setupPlayerProfile,
);
router.put(
  "/update-profile",
  auth(UserRole.Player),
  fileUploader.profileImage,
  parseBodyData,
  validateRequest(playerValidation.updatePlayerProfileSchema),
  playerController.updatePlayerProfile,
);

router.put(
  "/add-highlights-video",
  auth(UserRole.Player),
  fileUploader.highlightsVideo,
  playerController.addHighlightsVideo
);

export const playerRoutes = router;
