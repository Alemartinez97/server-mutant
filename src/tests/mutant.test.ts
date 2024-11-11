import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../app';
import { SECRET_KEY } from '../constant';

describe('POST /mutant', () => {
  let token: string;
  beforeAll(() => {
    const payload = { email: 'testuser@example.com' };
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  });
  it('should return 200 for mutant DNA', async () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];

    const response = await request(app)
      .post('/mutant')
      .set('Authorization', `Bearer ${token}`)
      .send({ dna });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Es un mutante' });
  });

  it('should return 400', async () => {
    const dna = [123123, 312312];

    const response = await request(app)
      .post('/mutant')
      .set('Authorization', `Bearer ${token}`)
      .send({ dna });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid DNA format' });
  });

  it('should return 403', async () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAGGG", "CGGCTA", "TCACTG"];

    const response = await request(app)
      .post('/mutant')
      .set('Authorization', `Bearer ${token}`)
      .send({ dna });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'No es un mutante' });
  });
});

