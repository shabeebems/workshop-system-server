import { Request, Response } from "express";
import { IAuthController, ResponsePayload } from "./auth.interface";
import { AuthService } from "../../services/auth/implementations/auth.service";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";

export class AuthController implements IAuthController {
    private authService = new AuthService();

    private handleResponse(res: Response, payload: ResponsePayload): void {
        const { success, message, ...data } = payload;
        const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        res.status(status).json({ success, message, ...data });
    }

    private async handleRequest(
        res: Response,
        fn: () => Promise<ResponsePayload>
    ): Promise<void> {
        try {
            const payload = await fn();
            this.handleResponse(res, payload);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }

    public login = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.login(res, req.body));

    public logout = (req: Request, res: Response): Promise<void> =>
        this.handleRequest(res, () => this.authService.logout(res));

}
