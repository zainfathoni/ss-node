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

// TABLE-SPECIFIC
exports.treeAll = function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var category = db.collection('category');
        var product = db.collection('product');

        // Find To Array
        category.find().toArray(function(err, result) {
            if (err) return next(err);

            var tree = categoryNode('_root');

            // Root Categories
            for (var i = 0, len = result.length; i < len; i++) {
                if (result[i].parent) {
                    continue;
                }

                delete result[i].parent;
                tree.children.push(categoryNode(result[i]));
            }

            // Remaining Categories
            while (anyParentRemains(result)) {
                for (var i = 0, len = result.length; i < len; i++) {
                    if (result[i].parent) {
                        iterateCategory(tree, result[i]);
                    }
                }
            }

            // Products
            product.find().toArray(function(err, result) {
                if (err) return next(err);
                
                // Remaining Products
                while (anyParentRemains(result)) {
                    for (var i = 0, len = result.length; i < len; i++) {
                        if (result[i].parent) {
                            iterateProduct(tree, result[i]);
                        }
                    }
                }
                
                res.send(tree);
            });
        });
    });
};

function categoryNode(data) {
    return {
        type: 'category',
        data: data,
        children: []
    };
}

function productNode(data) {
    return {
        type: 'product',
        data: data
    };
}

function anyParentRemains(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i].parent) {
            return true;
        } else {
            continue
        }
    }
    return false;
}

function iterateCategory(current, item) {
    var data = current.data;
    var children = current.children;

    if (item.parent === data.name) {
        delete item.parent;
        children.push(categoryNode(item));
    } else {
        for (var i = 0, len = children.length; i < len; i++) {
            iterateCategory(children[i], item);
        }
    }
}

function iterateProduct(current, item) {
    var data = current.data;
    var children = current.children;

    if (item.parent === data.name) {
        delete item.parent;
        children.push(productNode(item));
    } else if (children) {
        for (var i = 0, len = children.length; i < len; i++) {
            iterateProduct(children[i], item);
        }
    }
}

/*exports.treeAll = function(req, res, next) {
    var name = req.params.name;

    MongoClient.connect(url, function(err, db) {
        if (err) return next(err);
        var category = db.collection('category');
        var product = db.collection('product');

        // Find One
        category.findOne(
            { 'name': name },
            function(err, result) {
                if (err) return next(err);
                
                if (result) {
                    // Find Children
                    coll.findOne(
                        { 'parent': name },
                        function(err, result) {
                            if (err) return next(err);
                            
                            // Find Children
                            coll.
                            res.send(result);
                        });
                }
                
                res.send(result);
            });
    });


};*/