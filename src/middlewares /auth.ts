import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';

interface DecodedToken {
    email: string;
    exp: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }

        const decodedToken = jwt.verify(token, "top_secret") as DecodedToken;
        if (!decodedToken.email) {
            throw new Error("Invalid user ID");
        }

        if (decodedToken.exp <= moment().unix()) {
            return res.status(401).send({ message: "Expired token" });
        }

        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};

export default authMiddleware;
