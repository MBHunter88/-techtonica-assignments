const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// ----------------------------CRUD for 'species' table----------------------------------------------//

//CREATE species
app.post('/api/species', async (req, res) => {
    try {
        const newSpecies = {
            common_name: req.body.common_name,
            scientific_name: req.body.scientific_name,
            number_in_wild: req.body.number_in_wild,
            csc: req.body.conservation_status_code
        };
       
        const result = await db.query(
            'INSERT INTO species(common_name, scientific_name, number_in_wild, conservation_status_code) VALUES($1, $2, $3, $4) RETURNING *',
            [newSpecies.common_name, newSpecies.scientific_name, newSpecies.number_in_wild, newSpecies.conservation_status_code],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

//READ species
app.get('/api/species', async (req, res) => {
    try {
        const { rows: species } = await db.query('SELECT * FROM species');
        res.send(species);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//READ species JOIN query (shows a count for how many individuals are tracked)
app.get('/species/with-individual-counts', async (req, res) => {
    try {
      const result = await db.query(`
        SELECT 
          species.common_name,
          species.scientific_name,
          COUNT(individuals.id) AS individual_count
        FROM species
        LEFT JOIN individuals ON species.id = individuals.species_id
        GROUP BY species.common_name, species.scientific_name;
      `);
      res.json(result);
    } catch (err) {
      res.status(500).send('Error fetching species with individual counts');
    }
  });

//UPDATE species
app.put('/api/species/:speciesId', async (req, res) =>{
    const speciesId = req.params.speciesId
    const updatedSpecies = {
        common_name: req.body.common_name,
        scientific_name: req.body.scientific_name,
        number_in_wild: req.body.number_in_wild,
        conservation_status_code: req.body.conservation_status_code
    };
    console.log("In the server from the url - the species id", speciesId);
    console.log("In the server, from the react - the species to be edited", updatedSpecies);
    const query = `UPDATE species SET common_name=$1, scientific_name=$2, number_in_wild=$3, conservation_status_code=$4 WHERE id=${speciesId} RETURNING *`;
    const values = [updatedSpecies.common_name, updatedSpecies.scientific_name, updatedSpecies.number_in_wild, updatedSpecies.conservation_status_code];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

//DELETE species
app.delete('/api/species/:speciesId', async (req, res) => {
    try {
        const speciesId = req.params.speciesId;
        await db.query('DELETE FROM species WHERE id=$1', [speciesId]);
        console.log("From the delete request-url", speciesId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

// ----------------------------CRUD for 'sightings' table----------------------------------------------//

//CREATE sightings
app.post('/api/sightings', async (req, res) => {
    try {
        const newSighting = {
            date_of_sighting: req.body.date_of_sighting,
            location: req.body.location,
            is_healthy: req.body.is_healthy,
            sighter_email: req.body.sighter_email,
            individual_id: req.body.individual_id
        };
       
        const result = await db.query(
            'INSERT INTO sightings(date_of_sighting, location, is_healthy, sighter_email, individual_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [newSighting.date_of_sighting, newSighting.location, newSighting.is_healthy, newSighting.sighter_email, newSighting.individual_id],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

//READ sightings JOIN query with species & indviidual info
app.get('/api/sightings', async (req, res) => {
    try {
        const sightings  = await db.query(`
    SELECT 
        sightings.id AS sighting_id,
        sightings.date_of_sighting,
        sightings.location,
        sightings.is_healthy,
        sightings.sighter_email,
        individuals.nickname,
        species.common_name,
        species.scientific_name
      FROM sightings
      JOIN individuals ON sightings.individual_id = individuals.id
      JOIN species ON individuals.species_id = species.id;`);
        res.send(sightings.rows);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//READ sighting JOIN query that filters based on species
app.get('/sightings/species/:species', async (req, res) => {
    const speciesName = req.params.species;
    console.log('Species name:', speciesName);
    try {
      const result = await db.query(`
        SELECT 
          sightings.id AS sighting_id,
          sightings.date_of_sighting,
          sightings.location,
          sightings.is_healthy,
          sightings.sighter_email,
          individuals.nickname,
          species.common_name,
          species.scientific_name
        FROM sightings
        JOIN individuals ON sightings.individual_id = individuals.id
        JOIN species ON individuals.species_id = species.id
        WHERE species.common_name ILIKE $1;
      `, [speciesName]);
      res.json(result.rows);
      console.log('Fetched sightings:', result.rows);

    } catch (err) {
      res.status(500).send('Error fetching sightings for species');
    }
  });

//UPDATE sightings
app.put('/api/sightings/:sightingId', async (req, res) =>{
    const sightingId = req.params.sightingId
    const updatedSighting = {
            date_of_sighting: req.body.date_of_sighting,
            location: req.body.location,
            is_healthy: req.body.is_healthy,
            sighter_email: req.body.sighter_email,
            individual_id: req.body.individual_id
    };
    console.log("In the server from the url - the sighting id", sightingId);
    console.log("In the server, from the react - the sighting to be edited", updatedSighting);
    const query = `UPDATE sightings SET date_of_sighting=$1, location=$2, is_healthy=$3, sighter_email=$4, individual_id=$5 WHERE id=${sightingId} RETURNING *`;
    const values = [updatedSighting.date_of_sighting, updatedSighting.location, updatedSighting.is_healthy, updatedSighting.sighter_email, updatedSighting.individual_id];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

//DELETE sightings
app.delete('/api/sightings/:sightingId', async (req, res) => {
    try {
        const sightingId = req.params.sightingId;
        await db.query('DELETE FROM sightings WHERE id=$1', [sightingId]);
        console.log("From the delete request-url", sightingId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

// ----------------------------CRUD for 'individuals' table----------------------------------------------//

//CREATE individual
app.post('/api/individuals', async (req, res) => {
    try {
        const newIndividual = {
            nickname: req.body.nickname,
            scientist: req.body.scientist,
            species_id: req.body.species_id
        };
       
        const result = await db.query(
            'INSERT INTO individuals(nickname, scientist, species_id) VALUES($1, $2, $3) RETURNING *',
            [newIndividual.nickname, newIndividual.scientist, newIndividual.species_id],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

//READ individual
app.get('/api/individuals', async (req, res) => {
    try {
        const { rows: individuals } = await db.query('SELECT * FROM individuals');
        res.send(individuals);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//READ individual JOIN query for individuals tracked by species
app.get('/individuals/species/:species', async (req, res) => {
    const speciesName = req.params.species;
    try {
      const result = await db.query(`
        SELECT 
          individuals.id,
          individuals.nickname,
          individuals.scientist,
          species.common_name
        FROM individuals
        JOIN species ON individuals.species_id = species.id
        WHERE species.common_name = $1;
      `, [speciesName]);
      res.json(result);
    } catch (err) {
      res.status(500).send('Error fetching individuals for species');
    }
  });

//UPDATE individual
app.put('/api/individuals/:individualId', async (req, res) =>{
    const individualId = req.params.individualId
    const updatedIndividual = {
        nickname: req.body.nickname,
        scientist: req.body.scientist,
        species_id: req.body.species_id
    };
    console.log("In the server from the url - the individual id", individualId);
    console.log("In the server, from the react - the individual to be edited", updatedIndividual);
    const query = `UPDATE individuals SET nickname=$1, scientist=$2, species_id=$3 WHERE id=${individualId} RETURNING *`;
    const values = [updatedIndividual.nickname, updatedIndividual.scientist, updatedIndividual.species_id];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

//DELETE individual
app.delete('/api/individuals/:individualId', async (req, res) => {
    try {
        const individualId = req.params.individualId;
        await db.query('DELETE FROM individuals WHERE id=$1', [individualId]);
        console.log("From the delete request-url", individualId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});



// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});