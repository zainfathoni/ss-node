var router = require('express').Router();
var model = require('../model/tree');

// Parameter 'name' Handling
router.param('name', function(req, res, next, name) {
    req.name = name;
    next();
});

// Show All Category Tree
router.get('/', model.treeAll);

// Show Category Tree By Name
router.get('/:name', model.treeByName);

module.exports = router;