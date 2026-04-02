import { z } from "zod";
import { TPositionEnum } from "../player/player.validation";

const scoutValidationSchema = z.object({
  experience: z.string(),
  currentOrg: z.string().optional(),
  bio: z.string(),
  scoutingLevel: z.string(),
  specialization: z.string(),
  evalMethod: z.string(),
  preferredAge: z.string(),
  preferredRoles: z
    .array(TPositionEnum)
    .min(1, "At least one preferred role is required"),
});

export const scoutValidation = {
  scoutValidationSchema,
};
