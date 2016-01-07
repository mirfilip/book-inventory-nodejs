var _ = require('lodash');
var heroin = require('heroin-js');

var baseConfig = require('./base');
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var stagingConfig = {
    name: 'book-inventory-nodejs-staging',
    config_vars: {
        MONGO_URI: 'mongodb://heroku_rc6jxkln:jl60qp4df6khbm6tnh4j9139g6@ds035975.mongolab.com:35975/heroku_rc6jxkln',
        NODE_ENV: 'staging'
    },
    collaborators: [
        'miroslaw.filip@schibsted.pl']
};

var finalConfig = _.merge({}, baseConfig, stagingConfig);
console.log("Applying config:");
console.log(finalConfig);

configurator(finalConfig);
