"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.clearAccessToken = exports.clearRefreshToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = async (res, payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
        algorithm: 'HS256'
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: 'strict',
        path: '/'
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = async (res, payload) => {
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10d",
        algorithm: 'HS256'
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: 'strict',
        path: '/'
    });
};
exports.createRefreshToken = createRefreshToken;
const clearRefreshToken = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
};
exports.clearRefreshToken = clearRefreshToken;
const clearAccessToken = (res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
};
exports.clearAccessToken = clearAccessToken;
const decodeToken = async (req) => {
    const token = req.cookies?.accessToken;
    if (!token)
        return req.user;
    return jsonwebtoken_1.default.decode(token);
};
exports.decodeToken = decodeToken;
