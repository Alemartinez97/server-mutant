import { IUserModel } from "../interfaces/user.interface";
import { UserRepositoryImlp } from "../repositories/userRepository";
import { hashedPassword } from "../utils/hashedPassword";

export class userService {
    private userRepository: UserRepositoryImlp;

    constructor() {
        this.userRepository = new UserRepositoryImlp();
    }
    async createUser(payload: IUserModel): Promise<IUserModel> {
        try {
            if (payload.password) {
                payload.password = await hashedPassword(payload.password);
            }
            const result = await this.userRepository.createUser(payload);
            return result;
        } catch (error) {
            console.error(`Error en createUser: ${error}`);
            throw error;
        }
    }
    async getUserByEmail(email: string): Promise<IUserModel | null> {
        try {
            const result = await this.userRepository.getUserByEmail(email);
            return result;
        } catch (error) {
            console.error(`Error en getUserById: ${error}`);
            throw error;
        }
    }
}

export default userService;