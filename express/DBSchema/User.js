const mongoose = require('mongoose')
const Schema = mongoose.Schema;



// bookSchema

const BookSchema = new Schema({
    title: {
        type: String,
    },
    pages: {
        type: Number,
    },
    category: {
        type: String
    }

})

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    my_books: [BookSchema]
})


module.exports = User = mongoose.model('signup', UserSchema, 'users')