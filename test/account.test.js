const request = require('supertest');
const app = require('../server/server');
const User = require('../server/models/User');

describe('Account Management API', () => {
  let authToken;

  beforeAll(async () => {
    // Register a user and get the authentication token
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });

    authToken = res.body.token;
  });

  describe('GET /account/profile', () => {
    it('should get the user profile', async () => {
      const res = await request(app)
        .get('/account/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.user.username).toBe('testuser');
    });

    it('should return an error if the user is not authenticated', async () => {
      const res = await request(app).get('/account/profile');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Unauthorized');
    });
  });

  describe('PUT /account/profile', () => {
    it('should update the user profile', async () => {
      const res = await request(app)
        .put('/account/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ username: 'updateduser', password: 'updatedpassword' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Profile updated successfully');
    });

    it('should return an error if the user is not authenticated', async () => {
      const res = await request(app)
        .put('/account/profile')
        .send({ username: 'updateduser', password: 'updatedpassword' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Unauthorized');
    });
  });
});