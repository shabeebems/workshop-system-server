import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(' [VALIDATION] Request body:', req.body);
            const parsedData = schema.parse(req.body);
            console.log(' [VALIDATION] Validation passed');
            req.body = parsedData;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(' [VALIDATION] Validation failed:', error.issues);
                return res.status(400).json({
                success: false,
                message: ' The password you entered is incorrect.',
                errors: error.issues.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
                });
            }

            // Any other error
            console.log(' [VALIDATION] Server error:', error);
            return res.status(500).json({ success: false, message: ' Server error' });
        }
    };