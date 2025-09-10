"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("../../../utils/jwt");
const user_repositories_1 = require("../../../repositories/implementations/user.repositories");
const messages_1 = require("../../../constants/messages");
class AuthService {
    constructor() {
        this.userRepository = new user_repositories_1.UserRepository();
    }
    async login(res, data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user)
            return { success: false, message: messages_1.Messages.USER_NOT_FOUND };
        if (data.password != user.password)
            return { success: false, message: messages_1.Messages.PASSWORD_INCORRECT };
        if (user.isBlock)
            return { success: false, message: messages_1.Messages.USER_BLOCKED };
        const { _id, email } = user;
        const payload = { _id, email };
        await (0, jwt_1.createAccessToken)(res, payload);
        await (0, jwt_1.createRefreshToken)(res, payload);
        return { success: true, message: messages_1.Messages.LOGIN_SUCCESS, data: user };
    }
    async logout(res) {
        (0, jwt_1.clearRefreshToken)(res);
        (0, jwt_1.clearAccessToken)(res);
        return { success: true, message: messages_1.Messages.LOGOUT_SUCCESS };
    }
}
exports.AuthService = AuthService;
