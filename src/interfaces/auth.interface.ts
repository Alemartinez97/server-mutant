import { Request, Response } from "express";

export interface Auth {
    configurePassport(): Promise<any>;
    login(req: Request, res: Response, next: any): Promise<any>;
    signup(req:  Request, res: Response, next: any): Promise<any>;
}