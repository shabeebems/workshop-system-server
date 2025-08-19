import { Request, Response } from "express";

export type ExpressHandler = (req: Request, res: Response) => Promise<void>;

export interface IAdminController {
    check: ExpressHandler;
}
