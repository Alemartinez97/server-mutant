// import { isMutant } from "./utils/isMutant";  

// const dna1 = [
//     "ATGCGA",
//     "CAGTCC",
//     "TTAAGT",
//     "AGAAGG",
//     "CCTCTA",
//     "TCACTG"
// ];

// const dna2 = [
//     "ATGCGA",
//     "CAGTGC",
//     "TTATGT",
//     "AGAAG",
//     "GCCCTA",
//     "TCACTG"
// ];

// console.log(isMutant(dna1)); // true
// console.log(isMutant(dna2)); // false
// src/server.ts
import app from './app';  // Importa la configuración de la app

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
