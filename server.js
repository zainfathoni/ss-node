var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

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

// START SERVER
app.listen(port);
console.log('Listening on port ' + port);