const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');

app.use(express.json());
//make sure to invoke cors()
app.use(cors());

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
.then((client) => {
  //create db or connect to existing
  const db = client.db('blackjack_hub');
  //get the collection (table inside database)
  const playersCollection = db.collection('players');
  //create the routes
  const playersRouter = createRouter(playersCollection);
  //point app to the routes
  app.use('/api/players', playesrsRouter);
})
.catch(console.error);

app.listen(5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});