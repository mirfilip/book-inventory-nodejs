var _ = require('lodash');

// TODO: Use this in tests
module.exports = function() {
    var books = [];

    return {
        /**
         * Get books
         *
         * @returns {Array}
         */
        getBooks: function() {
            return Promise.resolve(books);
        },

        /**
         * Get a book
         *
         * @param {number} isbn
         * @returns {Object}
         */
        findByIsbn: function(isbn) {
            var book = _.find(books, {'isbn': isbn});

            return Promise.resolve(book);
        },

        /**
         * Add to stock
         *
         * @param {Object} book
         * @returns {Object}
         */
        addBooks: function(stockToSave) {
            //var oldBook = _.find(books, { 'isbn': book.isbn });
            //if (oldBook) {
            //    oldBook = book;
            //} else {
            //    books.push(book);
            //}

            //return Promise.resolve(oldBook);
        }
    };
};
