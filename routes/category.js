var router = require('express').Router();
var mongo = require('mongodb');
var base = require('../model/base');
var model = require('../model/category');

var ObjectID = mongo.ObjectID;

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
router.delete('/:id', model.delete);

module.exports = router;