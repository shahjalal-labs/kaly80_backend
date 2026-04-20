import { z } from "zod";

const matchSchema = z.object({
  matchType: z.string(),
  ageCategory: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  latitude: z
    .number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
    })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
    })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  ticketPrice: z
    .number({
      required_error: "Ticket price is required",
      invalid_type_error: "Ticket price must be a number",
    })
    .min(0, "Ticket price cannot be negative"),
  additionalInfo: z.string().optional(),
});
const sendMatchRequestSchema = z.object({
  matchId: z.string(),
});
const acceptRejectRequestSchema = z.object({
  requestId: z.string(),
  isAccepted: z.boolean(),
});

export const matchValidation = {
  matchSchema,
  sendMatchRequestSchema,
  acceptRejectRequestSchema
};
