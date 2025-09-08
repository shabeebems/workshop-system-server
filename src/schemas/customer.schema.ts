import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").optional(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  address: z.string().optional()
});

export const updateCustomerSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits").optional(),
  address: z.string().optional()
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;