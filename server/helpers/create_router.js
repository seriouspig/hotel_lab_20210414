const express = require('express');
const ObjectId = require('mongodb').ObjectID;

const error500 = function(err) {
    console.error(err);
    res.status(500);
    res.json({status:500, error:err});
}

const createRouter = function (collection) {

    const router = express.Router();

    router.get('/', (req, res) => {
        collection
            .find() //This gets the whole collection as an object
            .toArray() //Converts it to array
            .then((docs) => res.json(docs))
            .catch((err) => error500(err))
    })

    router.post('/', (req, res) => {
        const newData = req.body;
        collection.insertOne(newData)
        .then((result) => {
            res.json(result.ops[0])
        })
        .catch((err) => error500(err));

    })

    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        collection.deleteOne({_id:ObjectId(id)})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => error500(err));
    })


    return router;
};

module.exports = createRouter;