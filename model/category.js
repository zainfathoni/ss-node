var base = require('../model/base');
var table = 'category';

exports.insert = function(req, res, next) {
    base.insert(req, res, next, table);
}

exports.update = function(req, res, next) {
    base.update(req, res, next, table);
}