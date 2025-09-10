"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../utils/jwt");
const user_repositories_1 = require("../repositories/implementations/user.repositories");
const messages_1 = require("../constants/messages");
const userSchema = new user_repositories_1.UserRepository();
const authenticateToken = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
            if (accessToken) {
                // Verify access token
                jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_SECRET, async (err, decoded) => {
                    if (err) {
                        // If didnt verify delete access and refresh token
                        (0, jwt_1.clearAccessToken)(res);
                        (0, jwt_1.clearRefreshToken)(res);
                        // Pass error 406 to remove localStorage (Frontend validation in redux, and redux is persist, persist details are stored in local storage)
                        res.status(406).json({
                            success: false,
                            message: messages_1.Messages.ACCESS_TOKEN_INVALID
                        });
                        return;
                    }
                    const userDetails = await userSchema.findUserByToken(accessToken, ACCESS_TOKEN_SECRET || '');
                    const decodedUser = jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_SECRET || "");
                    if (userDetails.isBlock || (userDetails.isVerified === true && decodedUser.isVerified === false)) {
                        // If user blocked, delete access and refresh token
                        (0, jwt_1.clearAccessToken)(res);
                        (0, jwt_1.clearRefreshToken)(res);
                        res.status(406).json({
                            success: false,
                            message: messages_1.Messages.USER_BLOCKED
                        });
                        return;
                    }
                    if (!allowedRoles.includes(userDetails.role)) {
                        res.status(403).json({
                            success: false,
                            message: messages_1.Messages.UNAUTHORIZED_ACCESS
                        });
                        return;
                    }
                    next();
                });
            }
            else {
                // If no Access Token
                const refreshToken = req.cookies.refreshToken;
                if (refreshToken) {
                    // Verify refresh token
                    jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
                        if (err) {
                            // If didnt verify delete access and refresh token
                            (0, jwt_1.clearAccessToken)(res);
                            (0, jwt_1.clearRefreshToken)(res);
                            // Pass error 406 to remove local Storage (Frontend validation in redux, and redux is persist, persist details are stored in local storage)
                            res.status(406).json({
                                success: false,
                                message: messages_1.Messages.REFRESH_TOKEN_INVALID
                            });
                            return;
                        }
                        else {
                            // Creating new access Token
                            // Finding user details by refresh token to payload for create access token
                            const userDetails = await userSchema.findUserByToken(refreshToken, REFRESH_TOKEN_SECRET || '');
                            const decodedUser = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET || "");
                            if (userDetails.isBlock || (userDetails.isVerified === true && decodedUser.isVerified === false)) {
                                // If user blocked, delete refresh token
                                (0, jwt_1.clearRefreshToken)(res);
                                res.status(406).json({
                                    success: false,
                                    message: messages_1.Messages.USER_BLOCKED
                                });
                                return;
                            }
                            if (!allowedRoles.includes(userDetails.role)) {
                                console.log('eee');
                                res.status(403).json({
                                    success: false,
                                    message: messages_1.Messages.UNAUTHORIZED_ACCESS
                                });
                                return;
                            }
                            const { _id, email, role, isVerified } = userDetails;
                            const payload = {
                                _id, email, role, isVerified
                            };
                            // Creating new access token
                            await (0, jwt_1.createAccessToken)(res, payload);
                            // Change ObjectId to String to get details in this same request(accessToken only available next request)
                            payload._id = payload._id.toString();
                            // For access details in ths same request, because access token is created in this same request(accessToken only available next request).
                            req.user = payload;
                            next();
                        }
                    });
                }
                else {
                    res.status(406).json({
                        success: false,
                        message: messages_1.Messages.NO_TOKEN
                    });
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
};
exports.authenticateToken = authenticateToken;
