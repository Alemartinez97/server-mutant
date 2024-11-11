import { Request, Response, NextFunction } from 'express';

export const validateDna = (req: Request, res: Response, next: NextFunction) => {
    const { dna } = req.body;
    if (!Array.isArray(dna) || dna.length === 0 || !dna.every(row => typeof row === 'string')) {
        return res.status(400).json({ error: 'Invalid DNA format' });
    }
    next();
};