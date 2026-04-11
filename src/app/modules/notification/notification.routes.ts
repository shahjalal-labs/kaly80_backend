import { Router } from "express";
import { notificationController } from "./notification.controller";
import { notificationValidation } from "./notification.validation";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post("/send-test", notificationController.sendSingleNotification);

router.use(auth());

router.get("/my", notificationController.getMyNotifications);

router.get("/single/:id", notificationController.getSingleNotifAndMarkRead);

router.get("/unread-count", notificationController.getUnreadCount);

//mark all as read or unread
router.patch(
  "/mark-all",
  validateRequest(notificationValidation.markAllAsReadOrUnreadSchema),
  notificationController.markAllAsReadUnread,
);

export const notificationRoutes = router;
