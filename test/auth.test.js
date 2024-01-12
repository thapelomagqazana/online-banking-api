const request = require('supertest');
const app = require('../server/server');
const User = require('../server/models/User');

describe('Authentication API', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  // afterEach(async () => {
  //   app.close();
  // });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should return an error if the username already exists', async () => {
      // Register a user first
      await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      const res = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in a registered user', async () => {
      // Register a user first
      await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' });

      const res = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeTruthy();
    });

    it('should return an error for invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ username: 'nonexistentuser', password: 'invalidpassword' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});