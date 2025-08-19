import UserModel, { IUser } from "../../models/user.model";
import { BaseRepository } from "./base.repositories";
import { IUserRepository } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";

export class UserRepository
    extends BaseRepository<IUser>
    implements IUserRepository
{
    constructor() {
        super(UserModel);
    }

    findByEmail = (email: string): Promise<IUser | null> =>
        this.model.findOne({ email });

    findUserByToken = (token: string, jwtSecret: string): Promise<IUser | null> => {
        const verify: any = jwt.verify(token, jwtSecret);
        return this.findByEmail(verify.email)
    }
}