var router = require('express').Router();
var mongo = require('mongodb');
var model = require('../model/product');

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

// Parameter 'name' Handling
router.param('name', function(req, res, next, name) {
    req.name = name;
    next();
});

// Add
router.post('/', model.insert);

// Find All
router.get('/', model.findAll);

// Find by Id
router.get('/:id', model.findById);

// Find by Name
router.get('/name/:name', model.findByName);

// Update
router.put('/:id', model.update);

// Delete
router.delete('/:id', model.delete);

module.exports = router;