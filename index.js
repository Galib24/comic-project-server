require('dotenv').config()
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb part

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z8yqdyj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// collections
const comicCollection = client.db('comicDb').collection('ComicData');
app.get('/ComicData', async (req, res) => {
    const result = await comicCollection.find().toArray()
    res.send(result);
})



// test purpose
app.get('/', (req, res) => {
    res.send('it is running form')
})

app.listen(port, () => {
    console.log(`form is running on port ${port}`);
})
