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

    return router;
}

module.exports = createRouter;