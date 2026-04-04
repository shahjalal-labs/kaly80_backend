import { z } from "zod";
import { TPositionEnum } from "../player/player.validation";

const scoutValidationSchema = z.object({
  experience: z.string(),
  currentOrg: z.string().optional(),
  bio: z.string(),
  scoutingLevel: z.array(z.string().min(1)).min(1, "At least one scouting level is required"),
  specialization:  z.array(z.string().min(1)).min(1, "At least one specialization is required"),
  evalMethod:  z.array(z.string().min(1)).min(1, "At least one evaluation method is required"),
  preferredAge:  z.array(z.string().min(1)).min(1, "At least one preferred age is required"),
  preferredRoles: z
    .array(TPositionEnum)
    .min(1, "At least one preferred role is required"),
});

export const scoutValidation = {
  scoutValidationSchema,
};
