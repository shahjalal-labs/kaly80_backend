import { z } from "zod";

const clubValidationSchema = z.object({
  clubName: z.string(),
  location: z.string(),
  bio: z.string(),
  category: z.string(),
  // agonistica: z.string(),
  // preAgonistica: z.string(),
  socialLinks: z.array(z.string()).optional(),
});

export const clubValidation = {
  clubValidationSchema,
};
