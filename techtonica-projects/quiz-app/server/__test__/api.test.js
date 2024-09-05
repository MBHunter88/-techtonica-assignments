import request from 'supertest';
import app from '../server.js'; 
import { jest } from '@jest/globals'



//mock fetch request using mock data for response
global.fetch = jest.fn(() =>{
  console.log('Mock fetch called');
return Promise.resolve({
  json: () => Promise.resolve({results: {
        "category": "Entertainment: Music",
        "correct_answer": "The Bangles",
       "difficulty": "medium",
        "incorrect_answers":[
          "R.E.M.",
          "The Ocean Blue",
          "The Connells",
        ],
        "question": "Who was walking like an Egyptian in 1981?",
        "type": "multiple",
      }})
  })
})

describe('GET /api/trivia', () => {
  afterEach(() => {
    // Clear the mock after each test
    jest.clearAllMocks(); 
  });
  it('should return status 200 and a list of items', async () => {
    const response = await request(app).get('/api/trivia');
    console.log('Actual Response:', JSON.stringify(response.body));
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([/* expected items */]));
    expect(fetch).toHaveBeenCalledTimes(1)
  });
});




//original test code not utilizing mocking

// describe('GET /api/trivia', () => {
//   it('should return status 200 and a list of items', async () => {
//     const response = await request(app).get('/api/trivia');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(expect.arrayContaining([/* expected items */]));
//   });
// });
