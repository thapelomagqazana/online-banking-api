// test/transaction.test.js

const request = require('supertest');
const app = require('../server/server');
const Transaction = require('../server/models/Transaction');

describe('Transaction History API', () => {
  let authToken;

  beforeAll(async () => {
    // Assuming you have a user registered and authenticated to get the token
    // You can modify this part based on your authentication setup
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    authToken = res.body.token;
  });

  describe('GET /transaction/history', () => {
    it('should get the user transaction history', async () => {
      // Assuming you have a transaction stored in the database
      const transaction = new Transaction({
        userId: 'user_id_here',
        amount: 100,
        description: 'Test Transaction',
      });

      await transaction.save();

      const res = await request(app)
        .get('/transaction/history')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.transactions.length).toBe(1);
    });

    it('should return an error if the user is not authenticated', async () => {
      const res = await request(app).get('/transaction/history');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Unauthorized');
    });
  });
});
