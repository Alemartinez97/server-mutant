import { Request, Response } from 'express';

import { DnaService } from '../services/dnaService';

export class DnaController {
    private dnaService: DnaService;

    constructor() {
        this.dnaService = new DnaService;
    }
    async deleteAllDna(req: Request, res: Response): Promise<Response> {
        try {
            await this.dnaService.deleteAllDna()
            return res.status(200).json({ message: 'Se eliminaron los Dna' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al procesar el ADN', detail: error });
        }
    }
}