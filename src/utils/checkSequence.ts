export function checkSequence(dna: string[], row: number, col: number, rowStep: number, colStep: number): boolean {
    const base = dna[row][col];
    for (let i = 1; i < 4; i++) {
        const newRow = row + rowStep * i;
        const newCol = col + colStep * i;
        if (newRow < 0 || newRow >= dna.length || newCol < 0 || newCol >= dna[0].length || dna[newRow][newCol] !== base) {
            return false;
        }
    }
    return true;
}