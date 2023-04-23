import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const tokenSchema = z.object({
  token: z.string(),
});

export { tokenSchema, loginSchema };
