var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/**
 * Initialize body parsing
 */
app.use(bodyParser.json());

/**
 * Hello world endpoint
 */
app.get('/', function(request, response) {
    throw new Error('App logic is somehow broken. 500.');
    response.json({
        message: 'hello world'
    });
});

/**
 * Adding to stock endpoint
 */
app.post('/stock', function(request, response) {
    console.log('ISBN', request.body.isbn);
    console.log('COUNT', request.body.count);
    // Dummy return the request body
    response.json(request.body);
});

/**
 * Logger
 */
var logger = function(request, response, next) {
    console.log('There is an incoming request ' + Date.now());
    next();
};
app.use(logger);

/**
 * Router fallback
 */
var routerErrorHandler = function(req, res, next) {
    var err = new Error('Route not found');
    err.status = 404;
    next(err);
};
app.use(routerErrorHandler);

/**
 * Global error handler
 */
var errorHandler = function(err, req, res, next) {
    console.error(err.stack);
    var status = err.status || 500;
    res.status(status);
    res.json({
        message: 'Error handler fired',
        error: (process.env.NODE_ENV === 'development') ? err.toString() : {}
    });
};
app.use(errorHandler);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on " + host + ':' + port);
});
