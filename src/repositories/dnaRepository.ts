import Dna from '../model/dna';

export interface DnaRepository {
    saveDna(dna: string[], dnaHash: string, isMutant: boolean): Promise<void>;
    getDna(dnaHash: string): Promise<boolean>;
    getAllDna(isMutant: boolean): Promise<number>;
    deleteAllDna(): Promise<void>;
}

export class DnaRepositoryImpl implements DnaRepository {
    async deleteAllDna(): Promise<void> {
        await Dna.deleteMany();
    }
    async getAllDna(isMutant: boolean): Promise<number> {
        const total = await Dna.countDocuments({ isMutant });
        return total;
    }
    async getDna(dnaHash: string): Promise<boolean> {
        const response = await Dna.findOne({ dnaHash });
        return response !== null;
    }
    async saveDna(dna: string[], dnaHash: string, isMutant: boolean): Promise<void> {
        const dnaEntry = new Dna({ dna, dnaHash, isMutant });
        await dnaEntry.save();
    }
}

