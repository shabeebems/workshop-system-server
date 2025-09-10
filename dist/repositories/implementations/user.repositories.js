"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const base_repositories_1 = require("./base.repositories");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(user_model_1.default);
        this.findByEmail = (email) => this.model.findOne({ email });
        this.findUserByToken = (token, jwtSecret) => {
            const verify = jsonwebtoken_1.default.verify(token, jwtSecret);
            return this.findByEmail(verify.email);
        };
    }
}
exports.UserRepository = UserRepository;
