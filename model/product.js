var base = require('../model/base');
var table = 'product';

exports.insert = function(req, res, next) {
    base.insert(req, res, next, table);
}

exports.findAll = function(req, res, next) {
    base.findAll(req, res, next, table);
}

exports.findById = function(req, res, next) {
    base.find(req, res, next, table);
}

exports.findByName = function(req, res, next) {
    base.find(req, res, next, table);
}

exports.updateById = function(req, res, next) {
    base.update(req, res, next, table);
}

exports.updateByName = function(req, res, next) {
    base.update(req, res, next, table);
}

exports.deleteById = function(req, res, next) {
    base.delete(req, res, next, table);
}

exports.deleteByName = function(req, res, next) {
    base.delete(req, res, next, table);
}