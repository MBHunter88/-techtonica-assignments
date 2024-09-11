const request = require('supertest');
const app = require('../server');


describe('GET /api/events', () => {
 
  it('should return status 200 and a list of items', async () => {
    const response = await request(app).get('/api/events');
    console.log('Actual Response:', JSON.stringify(response.body));
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

  });
});
