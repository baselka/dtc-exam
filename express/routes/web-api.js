module.exports = app => {
    const JWT = require('../utils/jwt.js')
    const api_version = '/api/v1'
    const Auth = require('../controllers/auth')
    const Book = require('../controllers/book')

    // auth
    app.post(`${api_version}/signup`, Auth.signup)
    app.post(`${api_version}/login`, Auth.login)

    /** Add a Book */ 
    app.post(`${api_version}/add-book`, JWT.verifyToken, Book.addNewBook) 
    /** get books */ 
    app.get(`${api_version}/get-books/:page/:pageSize`, JWT.verifyToken, Book.getBooks) 
    app.post(`${api_version}/edit-book`, JWT.verifyToken, Book.editBook) 
    app.get(`${api_version}/search/:title`, JWT.verifyToken, Book.searchBook) 
    app.post(`${api_version}/delete-book`, JWT.verifyToken, Book.deleteBook) 


}

