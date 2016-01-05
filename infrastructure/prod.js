var _ = require('lodash');
var heroin = require('heroin-js');

var baseConfig = require('./base');
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var prodConfig = {
    name: 'book-inventory-nodejs',
    config_vars: {
        MONGO_URI: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj',
        NODE_ENV: 'production'
    },
    collaborators: ['mateusz.cyburt@schibsted.pl',
        'tomasz.racia@schibsted.pl',
        'miroslaw.filip@schibsted.pl']
};

var finalConfig = _.merge({}, baseConfig, prodConfig);
console.log("Applying config:");
console.log(finalConfig);

configurator(finalConfig);
