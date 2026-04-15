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
router.get(
  "/club-wise-posts",
  auth(UserRole.Club),
  jobController.clubJobPosts,
);
router.get(
  "/club-wise-hired",
  auth(UserRole.Club),
  jobController.clubJobHiredPosts,
);
router.post(
  "/apply",
  auth(UserRole.Player, UserRole.Coach, UserRole.Scout),
  jobController.createApplication,
);
router.get(
  "/applications/:id",
  auth(UserRole.Club),
  jobController.getAllApplicationsForJob,
);
router.delete(
  "/application/:id",
  auth(UserRole.Club),
  jobController.declineJobApplication,
);
router.patch(
  "/application/:id",
  auth(UserRole.Club),
  jobController.acceptJobApplication,
);

export const jobRoutes = router;
