import request from 'supertest';
import app from '../server.js'; 

describe('GET /api/trivia', () => {
  it('should return status 200 and a list of items', async () => {
    const response = await request(app).get('/api/trivia');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([/* expected items */]));
  });
});
