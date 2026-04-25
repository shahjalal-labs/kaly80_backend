import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { scoutController } from "./scout.controller";
import { scoutValidation } from "./scout.validation";

const router = express.Router();

router.post(
  "/set-profile",
  auth(UserRole.Scout),
  fileUploader.uploadMultiple,
  parseBodyData,
    validateRequest(scoutValidation.scoutValidationSchema),
  scoutController.setupScoutProfile,
);

router.put(
  "/update-profile",
  auth(UserRole.Scout),
  fileUploader.uploadMultiple,
  parseBodyData,
  // validateRequest(coachValidation.coachProfileSchema),
  scoutController.updateScoutProfile,
);

router.post(
  "/create-report",
  auth(UserRole.Scout),
  fileUploader.reportImage,
  parseBodyData,
    validateRequest(scoutValidation.playerStatsSchema),
  scoutController.createReport,
);
router.get(
  "/all-scouted",
  auth(UserRole.Scout),
  scoutController.allScouted,
);

export const scoutRoutes = router;
