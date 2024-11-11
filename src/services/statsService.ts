import { DnaRepositoryImpl } from "../repositories/dnaRepository";


export class StatsService {
    private dnaRepository: DnaRepositoryImpl;

    constructor() {
        this.dnaRepository = new DnaRepositoryImpl();
    }

    async getStats() {
        const totalMutants = await this.dnaRepository.getAllDna(true);
        const totalHumans = await this.dnaRepository.getAllDna(false);
        const ratio = totalHumans > 0 ? totalMutants / totalHumans : 0;

        return {
            count_mutant_dna: totalMutants,
            count_human_dna: totalHumans,
            ratio: ratio,
        };
    }
}
