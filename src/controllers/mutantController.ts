import { Request, Response } from 'express';
import { isMutant } from '../utils/isMutant';
import { DnaService } from '../services/dnaService';
import { generateDnaHash } from '../utils/generateDnaHash';

export class MutantController {
    private dnaService: DnaService;

    constructor() {
        this.dnaService = new DnaService;
    }
    async checkMutant(req: Request, res: Response): Promise<Response> {
        const { dna } = req.body;
        try {
            const dnaHash = generateDnaHash(dna);
            const result = isMutant(dna);
            await this.dnaService.saveDna(dna, dnaHash, result)
            if (result) {
                return res.status(200).json({ message: 'Es un mutante' });
            } else {
                return res.status(403).json({ message: 'No es un mutante' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error al procesar el ADN', detail: error });
        }
    }
}