import { IUser } from "../../models/user.model";
import { IBaseRepository } from "./base.interface";

export interface IUserRepository extends IBaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}
