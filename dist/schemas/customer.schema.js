"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerSchema = exports.createCustomerSchema = void 0;
const zod_1 = require("zod");
exports.createCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email format").optional(),
    mobile: zod_1.z.string().min(10, "Mobile number must be at least 10 digits"),
    address: zod_1.z.string().optional()
});
exports.updateCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    email: zod_1.z.string().email("Invalid email format").optional(),
    mobile: zod_1.z.string().min(10, "Mobile number must be at least 10 digits").optional(),
    address: zod_1.z.string().optional()
});
