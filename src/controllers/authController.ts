import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

export class AuthController {
    public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        await  authService.signup(req, res, next);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error al Registrarse' });
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
         await authService.login(req, res, next);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error al iniciar sesión' });
        }
    }
}
