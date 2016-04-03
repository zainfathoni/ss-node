var router = require('express').Router();
var mongo = require('mongodb');
var model = require('../model')

var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var url = 'mongodb://localhost:27017/ss-node';
var table = 'category';

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
router.post('/', function(req, res, next) {
    var item = req.body;
    
    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var coll = db.collection(table);
    
        // If similar Name found, update the content
        model.findByName(coll, item.name, next, function(result) {
            if (result) { // Update
                model.update(coll, result._id, item, next, function(result) {
                    res.send(result);
                });
            } else { // Insert
                model.insert(coll, item, next, function(result) {
                    res.send(result);
                });
            }
        });
    });
});

// Find All
router.get('/', function(req, res) {
    res.send('Find All');
});

// Find by Id
router.get('/:id', function(req, res) {
    res.send('Find by Id');
});

// Update
router.put('/:id', function(req, res) {
    res.send('Update');
});

// Delete
router.delete('/:id', function(req, res) {
    res.send('Delete');
});

module.exports = router;