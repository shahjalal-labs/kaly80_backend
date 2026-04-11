import { z } from "zod";

//w: (start)╭──────────── markAllAsReadOrUnread ────────────╮
const markAllAsReadOrUnreadSchema = z
  .object({
    isRead: z.boolean(),
  })
  .strict();
//w: (end)  ╰──────────── markAllAsReadOrUnread ────────────╯

export const notificationValidation = {
  markAllAsReadOrUnreadSchema,
};
