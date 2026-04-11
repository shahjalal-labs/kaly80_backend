import { NotificationType } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { paginationHelper, TOptions } from "../../../shared/pagination";
import admin from "../../../helpers/firebaseAdmin";

export const sendSingleNotification = async (
  receiverId: string,
  title: string,
  body: string,
  type: NotificationType,
  metaData?: any,
  senderId?: string,
) => {
  //  Get receiver info
  const receiverInfo = await prisma.user.findUnique({
    where: { id: receiverId },
    select: { id: true, fcmToken: true },
  });

  if (!receiverInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Receiver not found!");
  }

  //  Save notification in DB
  await prisma.notification.create({
    data: {
      receiverId,
      title,
      body,
      senderId,
      type,
      metaData,
    },
  });

  //  No token
  if (!receiverInfo.fcmToken) {
    console.log("No FCM token found for this user");
    return;
  }

  try {
    //  message
    const message = {
      token: receiverInfo.fcmToken,
      notification: {
        title,
        body,
      },
      data: metaData
        ? Object.fromEntries(
            Object.entries(metaData).map(([key, value]) => [
              key,
              String(value),
            ]),
          )
        : {},
    };

    //  Send notification
    const response = await admin.messaging().send(message);

    console.log("FCM send success:", response);
  } catch (error: any) {
    console.error("FCM send error:", error);

    //  remove invalid token
    if (
      error.code === "messaging/registration-token-not-registered" ||
      error.code === "messaging/invalid-registration-token"
    ) {
      await prisma.user.update({
        where: { id: receiverId },
        data: {
          fcmToken: null,
        },
      });

      console.log("Removed invalid FCM token");
    }
  }
};

const getMyNotifications = async (
  userId: string,
  options: TOptions,
  isRead: boolean | string,
) => {
  const { page, skip, limit } = paginationHelper(options);

  const [data, total] = await Promise.all([
    prisma.notification.findMany({
      where: {
        receiverId: userId,
        ...(typeof isRead === "boolean" ? { isRead } : {}),
      },
      select: {
        id: true,
        title: true,
        body: true,
        isRead: true,
        type: true,
        metaData: true,
        sender: {
          select: {
            id: true,
            fullName: true,
            profileImage: true,
          },
        },
        createdAt: true,
      },
      skip,
      take: limit,
      orderBy: {
        // same as createdAt:"desc"
        id: "desc",
      },
    }),

    prisma.notification.count({
      where: {
        receiverId: userId,
        ...(typeof isRead === "boolean" ? { isRead } : {}),
      },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

const markAllAsReadUnread = async (userId: string, isRead: boolean) => {
  await prisma.notification.updateMany({
    where: {
      receiverId: userId,
    },
    data: {
      isRead,
    },
  });
};

const getSingleNotifAndMarkRead = async (userId: string, notifId: string) => {
  const notif = await prisma.notification.findUnique({
    where: {
      id: notifId,
    },
  });

  if (!notif) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");
  }

  if (notif.receiverId !== userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to view  other's notification",
    );
  }

  const updatedNotif = await prisma.notification.update({
    where: {
      id: notifId,
    },
    data: {
      isRead: true,
    },
  });
  return updatedNotif;
};

const getUnreadCount = async (userId: string) => {
  return await prisma.notification.count({
    where: {
      receiverId: userId,
      isRead: false,
    },
  });
};

export const NotificationService = {
  sendSingleNotification,
  getMyNotifications,
  markAllAsReadUnread,
  getSingleNotifAndMarkRead,
  getUnreadCount,
};
