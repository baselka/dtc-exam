const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    added_by: {
        type: String,
        required: true
    },
    modified_by: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Book = mongoose.model('book', BookSchema, 'books')
