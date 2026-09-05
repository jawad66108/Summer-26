import { z } from "zod";

export let registerSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  role: z.enum(["admin", "committee"]).optional(),
});

export let loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
