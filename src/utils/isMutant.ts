import { checkSequence } from "./checkSequence";

export function isMutant(dna: string[]): boolean {
    const n = dna.length;
    let sequenceCount = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {

            if (j <= n - 4 && checkSequence(dna, i, j, 0, 1)) {
                sequenceCount++;
                if (sequenceCount > 1) return true;
            }

            if (i <= n - 4 && checkSequence(dna, i, j, 1, 0)) {
                sequenceCount++;
                if (sequenceCount > 1) return true;
            }

            if (i <= n - 4 && j <= n - 4 && checkSequence(dna, i, j, 1, 1)) {
                sequenceCount++;
                if (sequenceCount > 1) return true;
            }

            if (i >= 3 && j <= n - 4 && checkSequence(dna, i, j, -1, 1)) {
                sequenceCount++;
                if (sequenceCount > 1) return true;
            }
        }
    }

    return false;
}

