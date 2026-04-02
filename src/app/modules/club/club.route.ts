import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { clubValidation } from "./club.validation";
import { clubController } from "./club.controller";

const router = express.Router();

router.post(
  "/set-profile",
  auth(UserRole.Club),
  fileUploader.uploadMultiple,
  parseBodyData,
  validateRequest(clubValidation.clubValidationSchema),
  clubController.setupClubProfile,
);

export const clubRoutes = router;
