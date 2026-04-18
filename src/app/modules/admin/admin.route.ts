import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/all-players", auth(UserRole.Admin), adminController.allPlayers);
router.get("/all-coaches", auth(UserRole.Admin), adminController.allCoaches);
router.get("/all-scouts", auth(UserRole.Admin), adminController.allScouts);
router.get("/player-details/:id", auth(UserRole.Admin), adminController.playerDetails);
router.get("/coach-details/:id", auth(UserRole.Admin), adminController.coachDetails);
router.get("/scout-details/:id", auth(UserRole.Admin), adminController.scoutDetails);
router.delete("/delete-user/:id", auth(UserRole.Admin), adminController.deleteUser)

export const adminRoutes = router;
