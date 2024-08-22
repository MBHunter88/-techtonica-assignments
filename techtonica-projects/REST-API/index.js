import express from 'express';
import bodyParser from 'body-parser';
import data from './battlecards.js';
import cors from 'cors';
import battlegroundsCards from './battlecards.js';


const app = express();
const PORT = 5000;

//config cors middleware
app.use(cors());

//config  body-parser middlerware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
const urlencodedParser = bodyParser.urlencoded({ extended: false})


//create route for test "homepage"
app.get('/', (req, res) => {
    res.json("My get route is working")
    console.log("Hello World!")
})

//create endpoint for battlecards to print
app.get('/battlecards', (req, res) => {
    res.json(data)
})

//create POST route
app.post('/battlecards', urlencodedParser, (req, res) => {
    console.log('Adding new card...')
    const card = req.body;
    battlegroundsCards.push(card)
    res.send(`Card added with the name ${card.name}`)
})



// Create PUT route to update a card by ID
app.put('/battlecards/:id', urlencodedParser, (req, res) => {
    const { id } = req.params;
    const updatedCard = req.body;

    // Find the index of the card with the matching ID
    const cardIndex = battlegroundsCards.findIndex(card => card.id == id);

    if (cardIndex !== -1) {
        // Update the card with the new data
        battlegroundsCards[cardIndex] = { ...battlegroundsCards[cardIndex], ...updatedCard };
        res.send(`Card with ID ${id} has been updated.`);
    } else {
        res.status(404).send(`Card with ID ${id} not found.`);
    }
});



// Create DELETE route to remove a card by ID
app.delete('/battlecards/:id', (req, res) => {
    const { id } = req.params;

    // Find the index of the card with the matching ID
    const cardIndex = battlegroundsCards.findIndex(card => card.id == id);

    if (cardIndex !== -1) {
        // Remove the card from the array
        battlegroundsCards.splice(cardIndex, 1);
        res.send(`Card with ID ${id} has been deleted.`);
    } else {
        res.status(404).send(`Card with ID ${id} not found.`);
    }
});



//
app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))


// {
//     "id": 11,
//     "name": "Rylak",
//     "tier": 4,
//     "attack": 4,
//     "health": 3,
//     "abilities": ["Trigger battlecry on adjacent minion."]
// }