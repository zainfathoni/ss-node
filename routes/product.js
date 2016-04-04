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

// Add Product
router.post('/', model.insert);

// Find All Products
router.get('/', model.findAll);

// Find Product by Id
router.get('/:id', model.findById);

// Find Product by Name
router.get('/name/:name', model.findByName);

// Update Product by Id
router.put('/:id', model.updateById);

// Update Product by Name
// router.put('/name/:name', model.updateByName);

// Delete Product by Id
router.delete('/:id', model.deleteById);

// Delete Product by Name
// router.delete('/name/:name', model.deleteByName);

module.exports = router;