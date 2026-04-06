import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { coachController } from "./coach.controller";
import { coachValidation } from "./coach.validation";

const router = express.Router();

router.post(
  "/set-profile",
  auth(UserRole.Coach),
  fileUploader.uploadMultiple,
  parseBodyData,
  validateRequest(coachValidation.coachProfileSchema),
  coachController.setupCoachProfile,
);
router.put(
  "/update-profile",
  auth(UserRole.Coach),
  fileUploader.uploadMultiple,
  parseBodyData,
  // validateRequest(coachValidation.coachProfileSchema),
  coachController.updateCoachProfile,
);

export const coachRoutes = router;
