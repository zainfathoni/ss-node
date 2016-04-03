// ROUTES
// Get an instance of router
var router = require('express').Router();

// Add
router.post('/', function(req, res) {
    res.send('Add');
});

// Find All
router.get('/', function(req, res) {
    res.send('Find All');
});

// Find by Id
router.get('/:id', function(req, res) {
    res.send('Find by Id');
});

// Update
router.put('/:id', function(req, res) {
    res.send('Update');
});

// Delete
router.delete('/:id', function(req, res) {
    res.send('Delete');
});

module.exports = router;