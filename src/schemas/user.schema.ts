import { z } from 'zod';

/**
 * Login Schema
 */
export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
