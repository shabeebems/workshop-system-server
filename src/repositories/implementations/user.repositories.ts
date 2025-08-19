import { Types } from "mongoose";
import UserModel, { IUser } from "../../models/user.model";
import { BaseRepository } from "./base.repositories";
import { IUserRepository } from "../interfaces/user.interface";

export class UserRepository
    extends BaseRepository<IUser>
    implements IUserRepository
{
    constructor() {
        super(UserModel);
    }

    findByEmail = (email: string): Promise<IUser | null> =>
        this.model.findOne({ email });
}