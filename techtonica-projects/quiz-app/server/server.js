import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv"


//use .env for variables
dotenv.config();

const app = express();
const PORT = 3000;

//config cors middleware
app.use(cors());

//config  body-parser middlerware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//const urlencodedParser = bodyParser.urlencoded({ extended: false })


//create route for test "homepage" or "root"
app.get('/', (req, res) => {
    res.json("My get route is working")
    console.log("Hello World!")
})

//create route for trivia api *note to later update request with a session token to avoid duplicate questions*
app.get('/api/trivia', async (req, res) => {
    const apiUrl = `https://opentdb.com/api.php?amount=10`
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch { //include error catching
        res.status(500).json({ error: 'Failed to fetch trivia data' });
    }
});


app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))