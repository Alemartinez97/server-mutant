import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../app';
import { SECRET_KEY } from '../constant';

describe('GET /stats', () => {
  let token: string;
  beforeAll(() => {
    const payload = { email: 'testuser@example.com' }; 
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  });
  it('return stats 200', async () => {
    await request(app)
      .delete('/delete-all-dna')
      .set('Authorization', `Bearer ${token}`);
    const response = await request(app)
      .get('/stats')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        "count_mutant_dna": 0,
        "count_human_dna": 0,
        "ratio": 0
    });
  });
});

