import User from '../model/user';
import { IUserModel, User as UserModel } from '../interfaces/user.interface';

export class UserRepositoryImlp implements UserModel {
    async getUserByEmail(email: string): Promise<IUserModel | null> {
        return await User.findOne({ email });
    }
    async createUser(payload: IUserModel): Promise<IUserModel> {
        const newUser = new User(payload);
        return await newUser.save();
    }
}
