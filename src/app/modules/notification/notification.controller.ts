import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NotificationService } from "./notification.service";
import pick from "../../../shared/pick";
import { paginationOptions } from "../../../shared/pagination";

//send test notification
const sendSingleNotification = catchAsync(async (req, res) => {
  const { receiverId, title, body, type, senderId, metaData } = req.body;

  await NotificationService.sendSingleNotification(
    receiverId,
    title,
    body,
    type,
    metaData,
    senderId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Test notification send successfully",
    data: null,
  });
});

const getMyNotifications = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const options = pick(req.query, paginationOptions);

  let { isRead } = req.query;

  switch (isRead) {
    case "true": {
      (isRead as any) = true;
      break;
    }
    case "false": {
      (isRead as any) = false;
      break;
    }
    default: {
      isRead = "all";
    }
  }

  const result = await NotificationService.getMyNotifications(
    userId,
    options,
    isRead,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetched my notifications successfully",
    data: result,
  });
});

const getUnreadCount = catchAsync(async (req, res) => {
  const { id: userId } = req.user;

  const result = await NotificationService.getUnreadCount(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetched notification unread count successfully",
    data: {
      unreadCount: result,
    },
  });
});

const getSingleNotifAndMarkRead = catchAsync(async (req, res) => {
  const { id: userId } = req.user;

  const { id: notifId } = req.params;

  const result = await NotificationService.getSingleNotifAndMarkRead(
    userId,
    notifId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notification fetched successfully",
    data: result,
  });
});

const markAllAsReadUnread = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { isRead } = req.body;

  const result = await NotificationService.markAllAsReadUnread(userId, isRead);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status change successfully",
    data: result,
  });
});

export const notificationController = {
  sendSingleNotification,
  getMyNotifications,
  markAllAsReadUnread,
  getSingleNotifAndMarkRead,
  getUnreadCount,
};
