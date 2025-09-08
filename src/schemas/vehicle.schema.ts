import { z } from 'zod';

export const createVehicleSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  make: z.string().min(1, "Make is required"),
  vehicleModel: z.string().min(1, "Model is required"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  color: z.string().optional(),
  engineNumber: z.string().optional(),
  chassisNumber: z.string().optional(),
});

export const updateVehicleSchema = z.object({
  make: z.string().min(1, "Make is required").optional(),
  vehicleModel: z.string().min(1, "Model is required").optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  color: z.string().optional(),
  engineNumber: z.string().optional(),
  chassisNumber: z.string().optional()
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;