var heroin = require('heroin-js');

console.log('Using HEROKU_API_TOKEN: ' + process.env.HEROKU_API_TOKEN);
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('book-inventory-nodejs').then(function(result) {
    console.log(result);
});
