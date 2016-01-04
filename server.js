var express = require('express');
var app = express();

/**
 * Logger
 */
var logger = function(request, response, next) {
    console.log('There is an incoming request ' + Date.now());
    next();
};

//app.use(logger);

/**
 * Router
 */
app.get('/', logger, function(request, response) {
    response.end('hello world');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on " + host + ':' + port);
});
