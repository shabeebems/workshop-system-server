import { ServiceResponse } from "../../auth/interfaces/auth.interface";

export interface IUserService {
    check(): Promise<ServiceResponse>;
}
