const supertest = require('supertest');
const app = require('../server/server');

describe('Transaction Controller Tests', () => {
  it('should get transaction history', async () => {
    const res = await supertest(app)
      .get('/transaction/history')
      .set('Authorization', 'Bearer 12345678');

    expect(res.status).toBe(200);
    // Add more assertions based on your expected behavior
  });

  it('should transfer funds', async () => {
    const transferData = {
      accountNumber: 'senderAccountNumber',
      amount: 100,
      recipientAccountNumber: 'recipientAccountNumber',
    };

    const res = await supertest(app)
      .post('/transaction/transfer')
      .set('Authorization', 'Bearer YOUR_JWT_TOKEN')
      .send(transferData);

    expect(res.status).toBe(200);
    // Add more assertions based on your expected behavior
  });

  // Add more tests for other endpoints
});
