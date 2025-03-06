import { z } from "zod";

export const createIsssueSchema = z.object({
  title: z
    .string()
    .min(1, "title is required")
    .max(250, "title must be less 250 characters(s)"),
  description: z.string().min(1, "description is required"),
});
