var repository = require('./db_repository')();
var app = require('./book_inventory')(repository);

var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on " + host + ':' + port);
});
