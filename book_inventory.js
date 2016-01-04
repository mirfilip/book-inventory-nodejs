var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/**
 * Init MongoClient
 */
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/book_inventory';
var collection = null;
collection = mongoClient.connect(url).then(function(db) {
    console.log('Promise met');
    console.log(db);

    return db.collection('books')
});


/**
 * Initialize body parsing
 */
app.use(bodyParser.json());

/**
 * Hello world endpoint
 */
app.get('/', function(request, response) {
    //throw new Error('App logic is somehow broken. 500.');
    response.json({
        message: 'hello world'
    });
});

/**
 * Add books to collection endpoint
 */
app.post('/stock', function(request, response) {
    console.log('Payload', request.body);

    collection.then(function(collection) {
        return collection.insertMany(request.body);
    }).
    then(function(books) {
        response.json(books);
    });

    // Dummy return the request body
    response.status(200).json(request.body);
});

/**
 * Get books collection
 */
app.get('/stock', function(request, response) {
    collection.then(function(collection) {
        throw new Error('error in promise');
        return collection.find({}).toArray();
    }).then(function(books) {
        response.json(books)
    }).catch(function(err) {
        console.error(err);
        response.status(500).json({error: err.toString()})
    });
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

module.exports = app;
