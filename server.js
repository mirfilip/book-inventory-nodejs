var app = require('./book_inventory');

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening on " + host + ':' + port);
});
