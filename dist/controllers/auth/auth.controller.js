"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../../services/auth/implementations/auth.service");
const statusCode_1 = require("../../constants/statusCode");
const messages_1 = require("../../constants/messages");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        this.login = (req, res) => this.handleRequest(res, () => this.authService.login(res, req.body));
        this.logout = (req, res) => this.handleRequest(res, () => this.authService.logout(res));
    }
    handleResponse(res, payload) {
        const { success, message, ...data } = payload;
        const status = success ? statusCode_1.HttpStatus.OK : statusCode_1.HttpStatus.BAD_REQUEST;
        res.status(status).json({ success, message, ...data });
    }
    async handleRequest(res, fn) {
        try {
            const payload = await fn();
            this.handleResponse(res, payload);
        }
        catch (error) {
            res.status(statusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: messages_1.Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
exports.AuthController = AuthController;
