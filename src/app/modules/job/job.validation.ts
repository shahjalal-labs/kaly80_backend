import z from "zod";

const UserRoleEnum = z.enum(["Player", "Coach", "Scout"]);
const EmploymentTypeEnum = z.enum(["Full_Time", "Part_Time", "Contract"]);

const jobValidationSchema = z.object({
  position: UserRoleEnum,
  title: z.string(),
  description: z.string(),
  location: z.string(),
  employmentType: EmploymentTypeEnum,
  currency: z.string()
});

export const jobValidation = {
  jobValidationSchema,
};