var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var product = require('./routes/product');
var category = require('./routes/category');

// INITIALIZATION
var app = express();
var port = process.env.PORT || 3000;

// CONFIGURATION
// Morgan Logger
app.use(morgan('combined'));

// Body Parser
app.use(bodyParser.json());

// Development Error Handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production Error Handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Apply Routes
app.use('/product', product);
app.use('/category', category);

// START SERVER
app.listen(port);
console.log('Listening on port ' + port);