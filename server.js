var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var category = require('./routes/category');
var product = require('./routes/product');
var tree = require('./routes/tree');

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
app.use('/category', category);
app.use('/product', product);
app.use('/tree', tree);
app.route('/')
    .get(function(req, res) {
        res.send({
            app: 'ss-node',
            source: 'https://github.com/zainfathoni/ss-node',
            author: 'Zain Fathoni'
        })
    });

// START SERVER
app.listen(port);
console.log('Listening on port ' + port);