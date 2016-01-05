var heroin = require('heroin-js');

console.log('Using HEROKU_API_TOKEN: ' + process.env.HEROKU_API_TOKEN);
var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

var newConfig = { name: 'book-inventory-nodejs',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        MONGO_URI: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj',
        TEST_VARIABLE: true
    },
    addons: {},
    collaborators:
        [ 'mateusz.cyburt@schibsted.pl',
            'tomasz.racia@schibsted.pl',
            'miroslaw.filip@schibsted.pl' ],
    features:
    { 'runtime-dyno-metadata': { enabled: false },
        'log-runtime-metrics': { enabled: false },
        'http-session-affinity': { enabled: false },
        preboot: { enabled: false },
        'http-shard-header': { enabled: false },
        'http-end-to-end-continue': { enabled: false } },
    formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
    log_drains: [],
    domains: [ 'book-inventory-nodejs.herokuapp.com' ] };

configurator(newConfig);
