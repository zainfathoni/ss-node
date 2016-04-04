var router = require('express').Router();
var mongo = require('mongodb');
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

// Parameter 'name' Handling
router.param('name', function(req, res, next, name) {
    req.name = name;
    next();
});

// Add Category
router.post('/', model.insert);

// Add Product to Category
router.post('/:id', model.insertProduct);

// Find All Categories
router.get('/', model.findAll);

// Find Category by Id
router.get('/:id', model.findById);

// Find Category by Name
router.get('/name/:name', model.findByName);

// Update Category by Id
router.put('/:id', model.updateById);

// Update Category by Name
router.put('/name/:name', model.updateByName);

// Delete Category by Id
router.delete('/:id', model.deleteById);

// Delete Category by Name
router.delete('/name/:name', model.deleteByName);

module.exports = router;