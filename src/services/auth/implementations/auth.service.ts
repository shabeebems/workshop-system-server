import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { clearAccessToken, clearRefreshToken, createAccessToken, createRefreshToken } from "../../../utils/jwt";
import { UserRepository } from "../../../repositories/implementations/user.repositories";
import { IAuthService, ServiceResponse } from "../interfaces/auth.interface";
import { Messages } from "../../../constants/messages";

export class AuthService implements IAuthService {
    private userRepository = new UserRepository();

    public async login(res: Response, data: { email: string; password: string; role: string }): Promise<ServiceResponse> {
        console.log(' [AUTH] Login attempt for:', data.email);
        
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            console.log(' [AUTH] User not found:', data.email);
            return { success: false, message: Messages.USER_NOT_FOUND };
        }

        console.log('👤 [AUTH] User found:', user.email);
        console.log('🔐 [AUTH] Stored password format:', user.password?.substring(0, 10) + '...');
        console.log('🔑 [AUTH] Input password:', data.password);
                         
        // Check if password exists in database
        if (!user.password) {
            console.log('❌ [AUTH] No password stored for user:', data.email);
            return { success: false, message: 'Account setup incomplete. Please contact administrator.' };
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        console.log('✅ [AUTH] Password comparison result:', isValidPassword);
        
        if (!isValidPassword) {
            console.log(' [AUTH] Password incorrect for:', data.email);
            return { success: false, message: Messages.PASSWORD_INCORRECT };
        }        
        
        if (user.isBlock) {
            console.log(' [AUTH] User blocked:', data.email);
            return { success: false, message: Messages.USER_BLOCKED };
        }

        const { _id, email, role } = user
        const payload = { _id, email, role };
        const token = await createAccessToken(res, payload);
        await createRefreshToken(res, payload);
        
        return { success: true, message: Messages.LOGIN_SUCCESS, data: { token, user } };
    }

    public async logout(res: Response): Promise<ServiceResponse> {
        clearRefreshToken(res)
        clearAccessToken(res)
        return { success: true, message: Messages.LOGOUT_SUCCESS };
    }

    public async me(req: any, res: Response): Promise<ServiceResponse> {
        try {
            const accessToken = req.cookies?.accessToken;
            if (!accessToken) {    
                return { success: false, message: 'No token provided' };
            }

            const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
            const user = await this.userRepository.findByEmail(decoded.email);
            
            if (!user || user.isBlock) {
                return { success: false, message: 'User not found or blocked' };
            }

            const { _id, email, role, name, mobile, createdAt } = user;
            return { 
                success: true, 
                message: 'User verified', 
                data: { 
                    user: { _id, email, role, name, phone: mobile, createdAt }
                }
            };
        } catch (error) {
            return { success: false, message: 'Invalid token' };
        }
    }
}
