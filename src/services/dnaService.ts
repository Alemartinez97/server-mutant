import { DnaRepositoryImpl } from "../repositories/dnaRepository";


export class DnaService {
    private dnaRepository: DnaRepositoryImpl;

    constructor() {
        this.dnaRepository = new DnaRepositoryImpl();
    }

    async saveDna(dna: string[], dnaHash: string, isMutant: boolean) {
        const existingDna = await this.dnaRepository.getDna(dnaHash);
        if (existingDna) {
            return;
        }
        return await this.dnaRepository.saveDna(dna, dnaHash, isMutant);
    }
    async deleteAllDna() {
        return await this.dnaRepository.deleteAllDna();
    }
}
