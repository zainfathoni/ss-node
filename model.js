exports.insert = function(collection, item, callback) {
    // Insert (One or Many)
    collection.insert(
        item,
        function(err, result) {
            callback(err, result);
        });
};

exports.findAll = function(collection, callback) {
    // Find To Array
    collection.find().toArray(function(err, result) {
        callback(err, result);
    });
};

exports.findById = function(collection, id, callback) {
    // Find One
    collection.findOne(
        { '_id': id },
        function(err, result) {
            callback(err, result);
        });
};

exports.findByName = function(collection, name, callback) {
    // Find One
    collection.findOne(
        { 'name': name },
        function(err, result) {
            callback(err, result);
        });
};

exports.update = function(collection, id, item, callback) {
    // Update One
    collection.updateOne(
        { '_id': id },
        item,
        function(err, result) {
            callback(err, result);
        });
};

exports.delete = function(collection, id, callback) {
    // Delete One
    collection.deleteOne(
        { '_id': id },
        function(err, result) {
            callback(err, result);
        });
};