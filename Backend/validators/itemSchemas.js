import { z } from "zod";

export let createItemSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  category: z.string().min(1),
  sport: z.string().min(1),
  unit: z.string().min(1),
  quantity: z.number().int().nonnegative(),
  threshold: z.number().int().nonnegative(),
});
