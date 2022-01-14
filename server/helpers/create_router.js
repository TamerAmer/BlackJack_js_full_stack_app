const express = require('express');
//used to read id from db
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {
  const router = express.Router();

  //INDEX - GET ALL 
  router.get('/', (req, res) => {
    //takes our games/collection and presents it as an array async - promise
    collection.find().toArray()
      .then(docs => res.json(docs))
      .catch((err) => {
        console.error(err);
        //set status to internal server error
        res.status(500);
        //send client info on error
        res.json({ status: 500, error: err });
      });
  });

  //SHOW - GET ON BY ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    //use ObjectID to convert id 
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //CREATE
  router.post('/', (req, res) => {
    const newData = req.body;
    //insertOne returns a"result"(banana) object which we can then use to show
    collection.insertOne(newData)
      .then((result) => res.json(result.ops[0]))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //DELETE - REMOVE BY ID
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectID(id) })
      .then(result => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

   //UPDATE - put request
   router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    collection.updateOne(
      {_id: ObjectID(id)}, 
      {$set: updatedData}
    )
    .then( (result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  });

  return router;
}

module.exports = createRouter;