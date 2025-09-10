"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
const serviceSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Service name is required"),
    description: zod_1.z.string().optional(),
    amount: zod_1.z.number().min(0, "Amount must be positive")
});
exports.createOrderSchema = zod_1.z.object({
    customerId: zod_1.z.string().min(1, "Customer ID is required"),
    vehicleId: zod_1.z.string().min(1, "Vehicle ID is required"),
    services: zod_1.z.array(serviceSchema).min(1, "At least one service is required"),
    notes: zod_1.z.string().optional()
});
exports.updateOrderSchema = zod_1.z.object({
    services: zod_1.z.array(serviceSchema).optional(),
    notes: zod_1.z.string().optional()
});
