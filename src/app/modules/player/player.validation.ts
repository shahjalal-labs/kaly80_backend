import { z } from "zod";

export const TGenderEnum = z.enum(["Male", "Female", "Other"]);
export const TFootEnum = z.enum(["Left", "Right", "Both"]);
export const TPositionEnum = z.enum([
  "Goalkeeper",
  "Left_Back",
  "CB_Left",
  "CB_Right",
  "Right_Back",
  "CM_Left",
  "CM_Center",
  "CM_Right",
  "Left_Winger",
  "Right_Winger",
  "Striker",
]);

const playerProfileSchema = z.object({
  gender: TGenderEnum,
  profession: z.string().min(1, "Profession is required").optional(),
  subProfession: z.string().min(1, "Sub profession is required").optional(),
  city: z.string().min(1, "City is required"),
  bio: z.string(),
  education: z.string().optional(),
  skills: z.array(z.string().min(1)).min(1, "At least one skill is required"),
  playingStyle: z
    .array(z.string().min(1))
    .min(1, "At least one playing style is required"),
  dob: z.string().min(1, "Date of birth is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  bestFoot: TFootEnum,
  position: TPositionEnum,
  secondaryPosition: TPositionEnum.optional(),
  category: z.string().min(1, "Category is required"),
});

const updatePlayerProfileSchema = z.object({
  bio: z.string().optional(),
  fullName: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  bestFoot: TFootEnum.optional(),
  position: TPositionEnum.optional(),
  secondaryPosition: TPositionEnum.optional(),
});

export const playerValidation = {
  playerProfileSchema,
  updatePlayerProfileSchema,
};
