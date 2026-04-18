import { z } from "zod";
import { TPositionEnum } from "../player/player.validation";

const scoutValidationSchema = z.object({
  experience: z.string(),
  currentOrg: z.string().optional(),
  bio: z.string(),
  scoutingLevel: z
    .array(z.string().min(1))
    .min(1, "At least one scouting level is required"),
  specialization: z
    .array(z.string().min(1))
    .min(1, "At least one specialization is required"),
  evalMethod: z
    .array(z.string().min(1))
    .min(1, "At least one evaluation method is required"),
  preferredAge: z
    .array(z.string().min(1))
    .min(1, "At least one preferred age is required"),
  preferredRoles: z
    .array(TPositionEnum)
    .min(1, "At least one preferred role is required"),
});

const playerStatsSchema = z.object({
  playerId: z.string(),
  pace: z.number().int().min(0).max(100),
  shooting: z.number().int().min(0).max(100),
  passing: z.number().int().min(0).max(100),
  dribbling: z.number().int().min(0).max(100),
  defending: z.number().int().min(0).max(100),
  physical: z.number().int().min(0).max(100),
});

export const scoutValidation = {
  scoutValidationSchema,
  playerStatsSchema,
};
