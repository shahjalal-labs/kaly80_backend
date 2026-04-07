import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.routes";
import { playerRoutes } from "../modules/player/player.route";
import { coachRoutes } from "../modules/coach/coach.route";
import { clubRoutes } from "../modules/club/club.route";
import { scoutRoutes } from "../modules/scout/scout.route";
import { jobRoutes } from "../modules/job/job.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/users", route: userRoutes },
  { path: "/auth", route: authRoute },
  { path: "/player", route: playerRoutes },
  { path: "/coach", route: coachRoutes },
  { path: "/club", route: clubRoutes },
  { path: "/scout", route: scoutRoutes },
  { path: "/job", route: jobRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
