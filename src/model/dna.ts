import mongoose, { Schema, Document } from 'mongoose';

interface IDna extends Document {
  dna: string[];
  dnaHash: string,
  isMutant: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dnaSchema = new Schema<IDna>(
  {
    dna: { type: [String], required: true }, 
    dnaHash: { type: String, required: true, unique: true },
    isMutant: { type: Boolean, required: true }, 
  },
  { timestamps: true } 
);

const dna = mongoose.model<IDna>('dna', dnaSchema);

export default dna;
