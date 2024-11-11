import request from 'supertest';

import app from '../app';

describe('Auth Routes', () => {

  it('should register a new user (signup)', async () => {

    const user = {
      email: 'testuser@example.com',
      password: 'testpassword123'
    };

    const response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.status).toBe(201);  
    expect(response.body.message).toBe('Signup success');
    expect(response.body.user).toBe(user.email);
  });

  it('should login an existing user and return a token', async () => {
    const user = {
      email: 'testuser@example.com',
      password: 'testpassword123'
    };


    await request(app)
      .post('/signup')
      .send(user);

    const response = await request(app)
      .post('/login')
      .send(user);

    expect(response.status).toBe(200);  
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();  
  });

  it('should return error on invalid login (wrong password)', async () => {
    const user = {
      email: 'testuser@example.com',
      password: 'testpassword123'
    };

    await request(app)
      .post('/signup')
      .send(user);

    const response = await request(app)
      .post('/login')
      .send({ email: user.email, password: 'wrongpassword' });

    expect(response.status).toBe(404);  
    expect(response.body.message).toBeDefined();
  });

  it('a new user is registered', async () => {
    const user = {
      email: 'ale@example.com',
      password: 'testpassword123'
    };

  const  response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.status).toBe(201);  
    expect(response.body.message).toBeDefined();
  });

  it('should return error on login with unregistered user', async () => {
    const user = {
      email: 'unregistereduser@example.com',
      password: 'anyPassword123'
    };
    const response = await request(app)
      .post('/login')
      .send(user);

    expect(response.status).toBe(404); 
    expect(response.body.message).toBeDefined();
  });

});

