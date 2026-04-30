import express from "express";
import { notificationController } from "./notification.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/my-notifications",
  auth(),
  notificationController.getNotifications,
);
router.patch(
  "/:notificationId",
  auth(),
  notificationController.getSingleNotification,
);
router.patch(
  "/mark/all-as-read",
  auth(),
  notificationController.markAllNotificationAsRead,
);

export const notificationsRoute = router;
