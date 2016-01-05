var test = require('supertest');
var repository = require('./inmemory_repository')();
var app = require('../book_inventory')(repository);

/**
 * Test
 */
describe('Book inventory app e2e tests', function() {
    it('returns 200 on GET /', function(done) {
        test(app).get('/').expect(200).end(function(err, res){
            if (err) return done(err);
            done();
        });
    });
});
