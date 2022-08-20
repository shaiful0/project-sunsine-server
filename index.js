const express = require('express');
const cors = require('cors')

const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k1mi62m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

  try{
    await client.connect();
    const serviceCollection = client.db('task-project').collection('services');
   
    app.get('/service', async (req,res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })
  }
  finally{

  }
}
run().catch(console.dir);

app.get('/', (req, res) =>{
  res.send('Running CRUD Server');
});

app.listen(port, () =>{
  console.log('server is running');
})