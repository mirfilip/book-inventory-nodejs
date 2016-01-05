/**
 * Init MongoClient
 */
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/book_inventory';
var collection = null;
collection = mongoClient.connect(url).then(function(db) {
    return db.collection('books');
});

module.exports = function() {
    return {
        getBooks: function() {
            return collection.then(function(collection) {
                return collection.find({}).toArray();
            }).
            then(function(books) {
                return books;
            }).
            catch(function(err) {
                return null;
            });
        },
        addBooks: function(stockToSave) {
            return collection.then(function(collection) {
                return collection.insertMany(stockToSave);
            }).
            then(function(books) {
                return books;
            }).
            catch(function(err) {
                return null;
            });
        },
        findByIsbn: function(isbn) {
            return collection.then(function(collection) {
                return collection.find({"isbn": parseInt(isbn, 10)}).limit(1).next();
            }).
            then(function(book) {
                console.log("Fetched a book from repo");
                return book ? book : null;
            }).
            catch(function(err) {
                //console.log("Catch");
                console.error(err.stack);
                return null;
            });
        }
    };
};
