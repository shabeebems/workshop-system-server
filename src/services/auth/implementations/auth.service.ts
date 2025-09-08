import { Response } from "express";

import { clearAccessToken, clearRefreshToken, createAccessToken, createRefreshToken } from "../../../utils/jwt";
import { UserRepository } from "../../../repositories/implementations/user.repositories";
import { IAuthService, ServiceResponse } from "../interfaces/auth.interface";
import { Messages } from "../../../constants/messages";

export class AuthService implements IAuthService {
    private userRepository = new UserRepository();

    public async login(res: Response, data: { email: string; password: string }): Promise<ServiceResponse> {
        
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) return { success: false, message: Messages.USER_NOT_FOUND };

        if (data.password != user.password) return { success: false, message: Messages.PASSWORD_INCORRECT };
        
        if (user.isBlock) return { success: false, message: Messages.USER_BLOCKED };

        const { _id, email } = user
        const payload = { _id, email };

        await createAccessToken(res, payload);
        await createRefreshToken(res, payload);
        
        return { success: true, message: Messages.LOGIN_SUCCESS, data: user };
    }

    public async logout(res: Response): Promise<ServiceResponse> {
        clearRefreshToken(res)
        clearAccessToken(res)
        return { success: true, message: Messages.LOGOUT_SUCCESS };
    }
}
