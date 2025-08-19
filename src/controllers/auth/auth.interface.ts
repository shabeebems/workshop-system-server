import { Request, Response } from "express";

export interface ResponsePayload {
    success: boolean;
    message: string;
    [key: string]: any;
}

export type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export interface IAuthController {
    login: ExpressHandler;
    logout: ExpressHandler;
}
