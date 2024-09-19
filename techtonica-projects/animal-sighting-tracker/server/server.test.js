const request = require('supertest');
const app = require('./server');


//testing CRUD operations for the db

describe('GET /api/species', () => {
 
  it('should return status 200 and a list of items', async () => {
    const response = await request(app).get('/api/species');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    const firstSpecies = response.body[0];
    expect(firstSpecies).toHaveProperty('common_name');
    expect(firstSpecies).toHaveProperty('scientific_name');
    expect(firstSpecies).toHaveProperty('conservation_status_code');
    expect(firstSpecies).toHaveProperty('number_in_wild');
     });
  });

describe('POST /api/sightings', () => {
 
    it('should return status 200 and a new inserted sighting', async () => {
        const newSighting = {
            date_of_sighting: '12/23/21',
            location: 'Califonia',
            is_healthy: true,
            sighter_email: 'test@test.com',
            individual_id: 9
        };
      const response = await request(app)
      .post("/api/sightings")
      .send(newSighting)
      .expect(200)
      .then(async (response) => {
          // Check the response
          expect(response.body.date_of_sighting).toBeTruthy()
          expect(response.body.location).toBe(newSighting.location)
          expect(response.body.is_healthy).toBe(newSighting.is_healthy)
      
      expect(response.statusCode).toBe(200);      
    });
  });
})

describe('PUT /api/sightings/:sightingId', () => {
    it('should update sighting', async () => {
      const sightingId = 1; 
  
      const updatedSighting = {
        date_of_sighting: '12/23/21',
        location: 'California',
        is_healthy: false,
        sighter_email: 'test@test.com',
        individual_id: 9,
      };
  
      
      const response = await request(app)
        .put(`/api/sightings/${sightingId}`) 
        .send(updatedSighting);
  
      // Assertions
      expect(response.statusCode).toBe(200);
      expect(response.body.is_healthy).toBe(updatedSighting.is_healthy); 
      expect(response.body.location).toBe(updatedSighting.location); 
    });
  });


 describe('DELETE /api/sightings/:sightingId', () => {
    it("DELETE /api/sightings/:sightingId", async () => {
        const sighting ={
            id: 987,
            date_of_sighting: '12/23/21',
            location: 'Califonia',
            is_healthy: true,
            sighter_email: 'test@test.com',
            individual_id: 10
        }
    
        await request(app)
            .delete("/api/sightings/" + sighting.id)
            .expect(204)
    })

 });

