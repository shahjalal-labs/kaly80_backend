import { z } from "zod";

const coachProfileSchema = z.object({
  coachRole: z.string().min(2, "Coach role must be at least 2 characters"),
  city: z.string().min(2, "City is required"),
  licences: z
    .array(z.string().min(1))
    .min(1, "At least one licence is required"),
  skills: z.array(z.string().min(1)).min(1, "At least one skill is required"),
  lscSenior: z.string().min(1, "LSC Senior is required"),
  lscYouth: z.string().min(1, "LSC Youth is required"),
  bio: z.string(),
  education: z.string().optional(),
  dob: z.string(),
  height: z.string(),
  weight: z.string(),
});

export const coachValidation = {
  coachProfileSchema,
};
