import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/all-players", auth(UserRole.Admin), adminController.allPlayers);
router.get("/all-coaches", auth(UserRole.Admin), adminController.allCoaches);
router.get("/all-scouts", auth(UserRole.Admin), adminController.allScouts);
router.get("/all-matches", auth(UserRole.Admin), adminController.allMatches);
router.get("/all-clubs", auth(UserRole.Admin), adminController.allClubs);
router.get("/all-jobs", auth(UserRole.Admin), adminController.allJobs);
router.get("/player-details/:id", auth(UserRole.Admin), adminController.playerDetails);
router.get("/coach-details/:id", auth(UserRole.Admin), adminController.coachDetails);
router.get("/scout-details/:id", auth(UserRole.Admin), adminController.scoutDetails);
router.get("/job-details/:id", auth(UserRole.Admin), adminController.jobDetails);
router.get("/club-details/:id", auth(UserRole.Admin), adminController.clubDetails);
router.get("/match-details/:id", auth(UserRole.Admin), adminController.matchDetails);
router.delete("/delete-user/:id", auth(UserRole.Admin), adminController.deleteUser)
router.get("/dashboard-stats", auth(UserRole.Admin), adminController.dashboardStats)
router.get("/all-users", auth(UserRole.Admin), adminController.allUsers)
router.get("/user-growth", auth(UserRole.Admin), adminController.userGrowthChartData)

export const adminRoutes = router;
