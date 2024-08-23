import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import battlegroundsCards from './battlecards.js'; <---server is now connected to postgres database 
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;


//use .env for variables
dotenv.config();

const app = express();
const PORT = 5000;

//config cors middleware
app.use(cors());

//config  body-parser middlerware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const urlencodedParser = bodyParser.urlencoded({ extended: false })


//create new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//populate database with initial data from battlecards.js


//create route for test "homepage" or "root"
app.get('/', (req, res) => {
    res.json("My get route is working")
    console.log("Hello World!")
})

//create endpoint for battlecards to print using GET
app.get('/battlecards', async (req, res) => {
    try { //use try catch block to handle error
        const dbClient = await pool.query('SELECT * FROM battlegrounds_cards;'); //by using pool.query it releases the connection w/o using dbClient.release()
        res.json(dbClient.rows);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while retrieving battle cards.", error: err.message });
    }
});

//create POST route to add card to database
// Example input (JSON):
// {
//     "name": "New Card Name",
//     "tier": 1,
//     "attack": 3,
//     "health": 2,
//     "abilities": ["Some Ability"]
// }
app.post('/battlecards', urlencodedParser, async (req, res) => {
    const { name, tier, attack, health, abilities } = req.body;
    //ensure all attributes are included and respond with an example if data is missing
    if (!name || !tier || !attack || !health || !abilities) {
        return res.status(400).json({
            message: "Missing card data. Please provide name, tier,attack, health, and abilities.",
            example: {
                "name": "New Card Name",
                "tier": 1,
                "attack": 3,
                "health": 2,
                "abilities": "Some Ability"
            }
        });
    }
    try {
        //query to add new card
        const dbClient = await pool.query('INSERT INTO battlegrounds_cards (name, tier, attack, health, abilities) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, tier, attack, health, abilities]);
        res.status(201).json({ message: `Card with the name ${dbClient.rows[0].name}`, card: dbClient.rows[0] });
    } catch (err) {

    }
});


// create PUT route to update a card by ID
app.put('/battlecards/:id', urlencodedParser, async (req, res) => {
    const { id } = req.params;
    const { name, tier, attack, health, abilities } = req.body;
    //check for any missig data
    if (!name || !tier || !attack || !health || !abilities) {
        return res.status(400).json({ message: "Missing required card data. Please provide name, tier, attack, health, and abilities." });
    }
    try {
        //query to update card data
        const dbClient = await pool.query(
            'UPDATE battlegrounds_cards SET name = $1, tier = $2, attack = $3, health = $4, abilities = $5 WHERE id = $6 RETURNING *',
            [name, tier, attack, health, abilities, id]
        );
        if (dbClient.rowCount === 0) {
            return res.status(404).json({ message: `Card with ID ${id} not found` });
        }
        res.json({ message: `Card with ID ${id} has been updated`, card: dbClient.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "An error occured while updating the card", error: err.message })
    }
});



// create DELETE route to remove a card by ID
app.delete('/battlecards/:id', async (req, res) => {
    const { id } = req.params;

    try {
        //query to delete card
        const dbClient = await pool.query('DELETE FROM battlegrounds_cards WHERE id = $1 RETURNING *', [id]);

        if (dbClient.rowCount === 0) {
            return res.status(404).json({ message: `Card with ID ${id} not found.` });
        }

        res.json({ message: `Card with ID ${id} has been deleted.`, card: dbClient.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "An error occurred while deleting the card.", error: err.message });
    }
});



//
app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))

