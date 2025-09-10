import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

interface TokenPayload {
    _id: any;
    email: string;
}


export const createAccessToken = async (res: Response , payload: TokenPayload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '30m',
        algorithm: 'HS256'
    });
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        secure: isProduction,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: isProduction ? "none" : "lax",
        path: '/'
    });
}

export const createRefreshToken = async (res: Response , payload: TokenPayload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "10d",
        algorithm: 'HS256'
    });
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true,
        secure: isProduction,
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: isProduction ? "none" : "lax",
        path: '/'
    });
}

export const clearRefreshToken = (res: Response) => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: '/'
    });
};

export const clearAccessToken = (res: Response) => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: '/'
    });
};


export const decodeToken = async(req: Request): Promise<any> => {
    const token = req.cookies?.accessToken;
    if(!token) return req.user
    return jwt.decode(token);
}
