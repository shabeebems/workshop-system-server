"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        const parsedData = schema.parse(req.body);
        req.body = parsedData;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.issues.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
        // Any other error
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.validate = validate;
