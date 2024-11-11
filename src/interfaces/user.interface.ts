export interface User {
    getUserByEmail(email: string): Promise<IUserModel | null>;
    createUser(payload: IUserModel): Promise<IUserModel>;
}

export interface IUserModel {
    email: string,
    password: string,
}