var mongo = require('mongodb');
var utils = require('../utils/tree');

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

// TABLE-SPECIFIC
exports.treeAll = function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var category = db.collection('category');
        var product = db.collection('product');

        // Find To Array
        category.find().toArray(function(err, result) {
            if (err) return next(err);

            var tree = utils.categoryNode('_root');

            // Root Categories
            for (var i = 0, len = result.length; i < len; i++) {
                if (result[i].parent) {
                    continue;
                }

                delete result[i].parent;
                tree.children.push(
                    utils.categoryNode(result[i])
                );
            }

            // Remaining Categories
            while (utils.anyParentRemains(result)) {
                for (var i = 0, len = result.length; i < len; i++) {
                    if (result[i].parent) {
                        utils.iterateCategory(tree, result[i]);
                    }
                }
            }

            // Products
            product.find().toArray(function(err, result) {
                if (err) return next(err);

                // Remaining Products
                while (utils.anyParentRemains(result)) {
                    for (var i = 0, len = result.length; i < len; i++) {
                        if (result[i].parent) {
                            utils.iterateProduct(tree, result[i]);
                        }
                    }
                }

                res.send(tree);
            });
        });
    });
};

