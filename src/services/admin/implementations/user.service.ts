import { Messages } from "../../../constants/messages";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { IUserService } from "../interfaces/user.interface";

export class UserService implements IUserService {

    public async check(): Promise<ServiceResponse> {
        console.log('Admin api calling')
        return { success: true, message: Messages.FETCH_USERS_SUCCESS };
    }
}
