import { Response } from "express";

export type ServiceResponse = {
    success: boolean;
    message: string;
    data?: object | null;
};

export interface IAuthService {
    login(res: Response, data: { email: string; password: string; role: string }): Promise<ServiceResponse>;
    logout(res: Response): Promise<ServiceResponse>;
}
