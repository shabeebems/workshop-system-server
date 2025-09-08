import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  amount: z.number().min(0, "Amount must be positive")
});

export const createOrderSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  vehicleId: z.string().min(1, "Vehicle ID is required"),
  services: z.array(serviceSchema).min(1, "At least one service is required"),
  notes: z.string().optional()
});

export const updateOrderSchema = z.object({
  services: z.array(serviceSchema).optional(),
  notes: z.string().optional()
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;