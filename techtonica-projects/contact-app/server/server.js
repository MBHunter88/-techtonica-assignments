const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

//------------------------------------------CRUD Operations for 'contacts' & 'locations' tables----------------------------//

//enppoint for full contact list
app.get('/contacts', async (req, res) => {
    try {
        const { rows: contacts } = await db.query('SELECT id, name, email, phone FROM contacts');
        res.send(contacts);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//endpoint for indivual contact with details by id (join query)
app.get('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT contacts.id, contacts.name, contacts.email, contacts.phone, contacts.notes,
                   locations.address, locations.city, locations.state, locations.country
            FROM contacts
            LEFT JOIN locations ON contacts.id = locations.contact_id
            WHERE contacts.id = $1;
        `;
        const result = await db.query(query, [id]);
        res.json(result.rows[0]);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

//endpoint to add new contact
app.post('/contacts', async (req, res) => {
    try {
        const { name, email, phone, notes, address, city, state, country } = req.body;
        const contactQuery = 'INSERT INTO contacts (name, email, phone, notes) VALUES ($1, $2, $3, $4) RETURNING id';
        const contactResult = await db.query(contactQuery, [name, email, phone, notes]);

        const locationQuery = 'INSERT INTO locations (contact_id, address, city, state, country) VALUES ($1, $2, $3, $4, $5)';
        await db.query(locationQuery, [contactResult.rows[0].id, address, city, state, country]);

        res.status(201).json({ message: 'Contact added successfully' });
    } catch (e) {
        return res.status(400).json({ e });
    }
});


//endpoint to edit contact
app.put('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, notes, address, city, state, country } = req.body;

        const contactQuery = 'UPDATE contacts SET name = $1, email = $2, phone = $3, notes = $4 WHERE id = $5';
        await db.query(contactQuery, [name, email, phone, notes, id]);

        const locationQuery = 'UPDATE locations SET address = $1, city = $2, state = $3, country = $4 WHERE contact_id = $5';
        await db.query(locationQuery, [address, city, state, country, id]);

        res.json({ message: 'Contact updated successfully' });

    } catch (e) {
        return res.status(400).json({ e });
    }
})


//endpoint to delete contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM contacts WHERE id = $1', [id]);
        res.json({ message: 'Contact deleted successfully' });
    } catch (e) {
        return res.status(400).json({ e });
    }
})


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Yo, Server listening on ${PORT}`);
});