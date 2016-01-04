var express = require('express');
var bodyParser = require('body-parser');
var repository = require('./db_repository')();

var app = express();

//module.exports = app;
module.exports = function(repository) {
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
     * Get books collection
     */
    app.get('/stock', function(request, response) {
        repository.getBooks().then(function(stock) {
            console.log("Stock from repository", stock);
            if (null === stock) {
                throw new Error('Stock could not be found');
            }
            response.status(200).json(stock);
        });
    });

    /**
     * Get book by ISBN
     */
    app.get('/stock/:isbn', function(request, response) {
        var isbn = request.params.isbn;
        console.log('Asking for ISBN: ' + isbn);

        repository.findByIsbn(isbn).then(function(book) {
            console.log("Book from repository", book);
            // TODO: Add 404 handling
            response.status(200).json(book);
        });
    });

    /**
     * Add books to collection endpoint
     */
    app.post('/stock', function(request, response) {
        console.log('Payload', request.body);

        // TODO: Pass clone of request.body, not original
        repository.addBooks(request.body).then(function(savedStock) {
            if (savedStock.result.n !== request.body.length) {
                throw new Error('Error saving stock');
            }

            response.status(200).json(request.body);
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
};
