import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Email tidak valid")
    .trim()
    .toLowerCase()
    .max(254, "Email terlalu panjang"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(72, "Password terlalu panjang"),
});

export type LoginInput = z.infer<typeof loginSchema>;
