var router = require('express').Router();
var mongo = require('mongodb');
var base = require('../model/base');
var model = require('../model/product');

var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var url = 'mongodb://localhost:27017/ss-node';
var table = 'product';

// Parameter 'id' Validation
router.param('id', function(req, res, next, id) {
    if (!ObjectID.isValid(id)) {
        next(new Error('ObjectID is invalid.'));
    } else {
        req.id = ObjectID.createFromHexString(id);
        next();
    }
});

// Add
router.post('/', model.insert);

// Find All
router.get('/', function(req, res, next) {
    res.send('Find All');
});

// Find by Id
router.get('/:id', function(req, res, next) {
    res.send('Find by Id');
});

// Update
router.put('/:id', model.update);

// Delete
router.delete('/:id', function(req, res, next) {
    res.send('Delete');
});

module.exports = router;