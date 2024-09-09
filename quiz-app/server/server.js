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


//create route for trivia api 
//TODO: Update request with a session token to avoid duplicate questions
app.get('/api/trivia', async (req, res) => {
    const difficulty = req.query.difficulty || 'easy';
    const apiUrl = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`
  
    //check to ensure query is working
    console.log(`Fetching trivia with difficulty: ${difficulty}`);
    console.log(`API URL: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch { //include error handling
        res.status(500).json({ error: 'Failed to fetch trivia data' });
    }
});


app.listen(PORT, () => console.log(`Server is runnning on port http://localhost:${PORT}`))

export default app;