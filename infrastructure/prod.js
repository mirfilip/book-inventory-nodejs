var _ = require('lodash');
var heroin = require('heroin-js');

var baseConfig = require('./base');
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var prodConfig = {
    name: 'book-inventory-nodejs',
    config_vars: {
        MONGO_URI: 'mongodb://heroku_rc6jxkln:jl60qp4df6khbm6tnh4j9139g6@ds035975.mongolab.com:35975/heroku_rc6jxkln',
        NODE_ENV: 'production'
    },
    collaborators: ['mateusz.cyburt@schibsted.pl',
        'tomasz.racia@schibsted.pl',
        'miroslaw.filip@schibsted.pl'],
    log_drains: ['syslog://data.logentries.com:13636']
};

var finalConfig = _.merge({}, baseConfig, prodConfig);
console.log("Applying config:");
console.log(finalConfig);

configurator(finalConfig);
