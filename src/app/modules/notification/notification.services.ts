import ApiError from "../../../errors/ApiErrors";
import admin from "../../../helpers/firebaseAdmin";
import prisma from "../../../shared/prisma";

// Send notification to a single user
export const sendSingleNotification = async (
  userId: string,
  title: string,
  content: string,
) => {
  const userInfo = await prisma.user.findUnique({ where: { id: userId } });
  if (!userInfo) return;
  if (!userInfo.fcmToken) {
    await prisma.notification.create({
      data: {
        userId,
        title,
        content,
      },
    });
    return;
  }

  const message = {
    notification: {
      title: title,
      body: content,
    },
    token: userInfo.fcmToken,
  };

  await prisma.notification.create({
    data: {
      userId,
      title,
      content,
    },
  });

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error: any) {
    if (error.code === "messaging/registration-token-not-registered") {
      await prisma.user.update({
        where: { id: userId },
        data: { fcmToken: null },
      });
    }
    console.log(error);
    return;
  }
};

export const sendMultipleNotifications = async (
  users: { id: string; fcmToken: string | null }[],
  title: string,
  content: string,
) => {
  if (!users.length) return;

  const messages = users
    .filter((user) => user.fcmToken)
    .map((user) => ({
      notification: {
        title: title,
        body: content,
      },
      token: user.fcmToken!,
    }));

  await prisma.notification.createMany({
    data: users.map((user) => ({
      userId: user.id,
      title,
      content,
    })),
  });

  try {
    const response = await admin.messaging().sendEach(messages);
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};

const getNotifications = async (userId: string) => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          fullName: true,
          profileImage: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return notifications;
};

const getSingleNotification = async (
  userId: string,
  notificationId: string,
) => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId,
      userId,
    },
  });

  if (!notification) {
    throw new ApiError(404, "Notification not");
  }

  const updateNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return updateNotification;
};

export const notificationServices = {
  getNotifications,
  getSingleNotification,
};
