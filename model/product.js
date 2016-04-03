var base = require('../model/base');
var table = 'product';

exports.insert = function(req, res, next) {
    base.insert(req, res, next, table);
}

exports.update = function(req, res, next) {
    base.update(req, res, next, table);
}

exports.delete = function(req, res, next) {
    base.delete(req, res, next, table);
}