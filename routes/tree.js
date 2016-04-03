var router = require('express').Router();
var model = require('../model/tree');

// Show All Category Tree
router.get('/', model.treeAll);

// Show Category Tree By Name
// router.get('/:name', model.treeByName);

module.exports = router;