var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var url = 'mongodb://localhost:27017/ss-node';

exports.insert = function(req, res, next, table) {
    var item = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var coll = db.collection(table);

        // Insert One
        coll.insertOne(
            item,
            function(err, result) {
                if (err) return next(err);
                res.send(result);
            });

    });
}

exports.findAll = function(req, res, next, table) {
    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var coll = db.collection(table);

        // Find To Array
        coll.find().toArray(function(err, result) {
            if (err) return next(err);
            res.send(result);
        });
    });


};

exports.findById = function(req, res, next, table) {
    var id = req.id;

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var coll = db.collection(table);

        // Find One
        coll.findOne(
            { '_id': id },
            function(err, result) {
                if (err) return next(err);
                res.send(result);
            });
    });


};

exports.update = function(req, res, next, table) {
    var id = req.id;
    var item = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var coll = db.collection(table);

        // Update One
        coll.updateOne(
            { '_id': id },
            item,
            function(err, result) {
                if (err) return next(err);
                res.send(result);
            });
    });
}

exports.delete = function(req, res, next, table) {
    var id = req.id;
    var item = req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var coll = db.collection(table);

        // Delete One
        coll.deleteOne(
            { '_id': id },
            function(err, result) {
                if (err) return next(err);
                res.send(result);
            });
    });
}