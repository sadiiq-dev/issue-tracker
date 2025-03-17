import { z } from "zod";

export const schemaCreateForm = z.object({
  title: z
    .string()
    .min(1, "title is required")
    .max(250, "title must be less 250 characters(s)"),
  description: z.string().min(1, "description is required").max(65535),
});

export const schemaUpdateIssue = z.object({
  title: z
    .string()
    .min(1, "title is required")
    .max(250, "title must be less 250 characters(s)")
    .optional(),
  description: z
    .string()
    .min(1, "description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required")
    .optional()
    .nullable(),
});
