import { Request, Response } from 'express';
import { isMutant } from '../utils/isMutant';
import { StatsService } from '../services/statsService';

export class StatsController {
    private statsService: StatsService;

    constructor() {
        this.statsService = new StatsService;
    }
    async getStats(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.statsService.getStats();

            if (result) {
                return res.status(200).json(result);
            } else {
                return res.status(403).json({ message: 'No hay estadisticas disponibles' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error al procesar la estadistica' });
        }
    }
}