import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import moment from 'moment';
import { SECRET_KEY, SECRET_KEY_TOKEN } from '../constant/index';
import { Auth } from "../interfaces/auth.interface";
import { IUserModel } from '../interfaces/user.interface';
import UserService from "../services/userService";
import { isValidPassword } from "../utils/isValidPassword";
import { NextFunction, Request, Response } from 'express';

class AuthService implements Auth {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    public async configurePassport(): Promise<void> {
        passport.use(
            "signup",
            new localStrategy(
                {
                    usernameField: "email",
                    passwordField: "password",
                    passReqToCallback: true,
                },
                async (req: any, email: string, password: string, done: any) => {
                    try {
                        let body = req.body as IUserModel;
                        const user = await this.userService.getUserByEmail(email);
                        if (!user) {
                            await this.userService.createUser(body);
                        }
                        return done(null, email, { message: "Signup success" });
                    } catch (e) {
                        done(e);
                    }
                }
            )
        );

        passport.use(
            "login",
            new localStrategy(
                {
                    usernameField: "email",
                    passwordField: "password",
                    passReqToCallback: true,
                },
                async (req: any, email: string, password: string, done: any) => {
                    try {
                        const user = await this.userService.getUserByEmail(email);
                        if (!user) {
                            return done(null, false, { message: "User not found" });
                        }
                        const validate = await isValidPassword(user.password, password);
                        if (!validate) {
                            console.error("Wrong password");
                            return done(null, false);
                        }
                        return done(null, email, { message: "Login success" });
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
            )
        );

        passport.use(
            new JWTStrategy(
                {
                    secretOrKey: SECRET_KEY,
                    jwtFromRequest: ExtractJwt.fromUrlQueryParameter(SECRET_KEY_TOKEN),
                },
                async (token: string | any, done: any) => {
                    try {
                        return done(null, token?.user);
                    } catch (e) {
                        done(e);
                    }
                }
            )
        );
    }

    public async signup(req: Request, res: Response, next: any): Promise<void> {
        try {
            passport.authenticate('signup', async (err: any, user: any, info: any) => {
                if (err || !user) {
                    return res.status(500).json({ message: "Error en el registro" });
                }
                
                return res.status(201).json({
                    message: info?.message || "Signup successful",
                    user: user, 
                });
            })(req, res, next);
        } catch (error) {
            console.error(`Error en signup: ${error}`);
            return next(error);
        }
    }


    public async login(req: Request, res: Response, next: any): Promise<void> {
        try {
            passport.authenticate('login', async (err: any, user: any, info: any) => {
                const { body } = req;
                const response = await this.userService.getUserByEmail(user);
    
                if (!response) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
    
                const isValid = await isValidPassword(response.password, body?.password);
                if (!isValid) {
                    return res.status(401).json({
                        message: "Invalid credentials",
                    });
                }
    
                const payload = {  
                    email: response.email,
                    iat: moment().unix(), 
                    exp: moment().add(60, "minutes").unix(), 
                };
    
                const token = jwt.sign(payload, SECRET_KEY);
    
                return res.status(200).json({
                    message: "Login successful",
                    token,  
                });
            })(req, res, next);
           
        } catch (error) {
            console.error("Login error:", error);
            return next(error);
        }
    }

}

export default new AuthService();
