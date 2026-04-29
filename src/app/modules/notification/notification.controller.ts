import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { notificationServices } from "./notification.services";

const getNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationServices.getNotifications(
    req.user.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notifications retrieved successfully",
    data: notifications,
  });
});

const getSingleNotification = catchAsync(async (req, res) => {
  const notificationId = req.params.notificationId;
  const notification = await notificationServices.getSingleNotification(
    req.user.id,
    notificationId,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Notification retrieved successfully",
    data: notification,
  });
});
const markAllNotificationAsRead = catchAsync(async (req, res) => {
  await notificationServices.markAllNotificationAsRead(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All notifications marked as read",
  });
});

export const notificationController = {
  getNotifications,
  getSingleNotification,
  markAllNotificationAsRead,
};
