var _ = require('lodash');
var heroin = require('heroin-js');

var baseConfig = require('./base');
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var stagingConfig = {
    name: 'book-inventory-nodejs-staging',
    config_vars: {
        MONGO_URI: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj',
        NODE_ENV: 'staging'
    },
    collaborators: [
        'miroslaw.filip@schibsted.pl']
};

var finalConfig = _.merge({}, baseConfig, stagingConfig);
console.log("Applying config:");
console.log(finalConfig);

configurator(finalConfig);
