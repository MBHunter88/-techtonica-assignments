import express from 'express';
//import data from './battlecards';
import cors from 'cors';

const app = express();
const PORT = 5000;

//config cors middleware
app.use(cors());

//create route
app.get('/', (req, res) => {
    console.log("Hello World!")
})

app.listen(PORT, () => console.log(`Server is runnning on port ${PORT}`))
