import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { matchController } from "./match.controller";
import { matchValidation } from "./match.validation";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.Club),
  validateRequest(matchValidation.matchSchema),
  matchController.createMatchRequest,
);
router.get(
  "/all",
  auth(UserRole.Club),
  matchController.activeMatches,
);
router.post(
  "/send-request",
  auth(UserRole.Club),
  validateRequest(matchValidation.sendMatchRequestSchema),
  matchController.sendMatchRequest,
);
router.get(
  "/requests",
  auth(UserRole.Club),
  matchController.requests,
);
router.put(
  "/accept-reject",
  auth(UserRole.Club),
  validateRequest(matchValidation.acceptRejectRequestSchema),
  matchController.acceptRejectRequest,
);
router.get(
  "/confirmed",
  auth(UserRole.Club),
  matchController.confirmedMatches,
);
router.get(
  "/confirmed/:id",
  auth(UserRole.Club),
  matchController.confirmedMatch,
);



export const matchRoutes = router;
