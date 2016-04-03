exports.insert = function(collection, item, next, callback) {
    // Insert One
    collection.insertOne(
        item,
        function(err, result) {
            if (err) return next(err);
            callback(result);
        });
};

exports.findAll = function(collection, next, callback) {
    // Find To Array
    collection.find().toArray(function(err, result) {
        if (err) return next(err);
        callback(result);
    });
};

exports.findById = function(collection, id, next, callback) {
    // Find One
    collection.findOne(
        { '_id': id },
        function(err, result) {
            if (err) return next(err);
            callback(result);
        });
};

exports.findByName = function(collection, name, next, callback) {
    // Find One
    collection.findOne(
        { 'name': name },
        function(err, result) {
            if (err) return next(err);
            callback(result);
        });
};

exports.update = function(collection, id, item, next, callback) {
    // Update One
    collection.updateOne(
        { '_id': id },
        item,
        function(err, result) {
            if (err) return next(err);
            callback(result);
        });
};

exports.delete = function(collection, id, next, callback) {
    // Delete One
    collection.deleteOne(
        { '_id': id },
        function(err, result) {
            if (err) return next(err);
            callback(result);
        });
};