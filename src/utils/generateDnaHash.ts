import crypto from 'crypto';
export function generateDnaHash(dna: string[]): string {
    const hash = crypto.createHash('sha256');
    hash.update(dna.join(''));
    return hash.digest('hex');
}