import { z } from "zod";

export const createIsssueSchema = z.object({
  title: z.string().min(1, "title is required").max(250),
  description: z.string(),
});
