import express from "express";
import auth from "../../middlewares/auth";
import { jobController } from "./job.controller";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserRole } from "@prisma/client";
import { parseBodyData } from "../../middlewares/parseBodyData";
import { jobValidation } from "./job.validation";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.Club),
  fileUploader.bannerImage,
  parseBodyData,
  validateRequest(jobValidation.jobValidationSchema),
  jobController.createNewJob,
);
router.get(
  "/circulars",
  auth(UserRole.Player, UserRole.Coach, UserRole.Scout),
  jobController.jobCirculars,
);
router.get(
  "/details/:id",
  auth(),
  jobController.jobDetails,
);

export const jobRoutes = router;
