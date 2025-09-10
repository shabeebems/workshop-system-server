"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleSchema = exports.createVehicleSchema = void 0;
const zod_1 = require("zod");
exports.createVehicleSchema = zod_1.z.object({
    vehicleNumber: zod_1.z.string().min(1, "Vehicle number is required"),
    make: zod_1.z.string().min(1, "Make is required"),
    vehicleModel: zod_1.z.string().min(1, "Model is required"),
    year: zod_1.z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
    color: zod_1.z.string().optional(),
    engineNumber: zod_1.z.string().optional(),
    chassisNumber: zod_1.z.string().optional(),
});
exports.updateVehicleSchema = zod_1.z.object({
    make: zod_1.z.string().min(1, "Make is required").optional(),
    vehicleModel: zod_1.z.string().min(1, "Model is required").optional(),
    year: zod_1.z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
    color: zod_1.z.string().optional(),
    engineNumber: zod_1.z.string().optional(),
    chassisNumber: zod_1.z.string().optional()
});
