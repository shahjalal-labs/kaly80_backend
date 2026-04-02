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

export const playerRoutes = router;
