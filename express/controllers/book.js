const Book = require('../models/bookModel.js')
const userId = require('../utils/jwt')

exports.addNewBook = (req, res) => {
    const user = req.user.data.name
    const {title, pages, category } = req.body;
    if (  title == null  || title.length < 1  || pages == null   || category == null  || pages.length < 1  || category.length < 1 ) {
           res.status(400).send({
               statusName: 'Bad Request',
               statusCode: 400,
               message: "Can not your book please check Title, Pages and Category  "
           });
       }else {
          
           Book.addNewBook(user, title, pages, category, (err,data) => {
               if(err) {
                   res.status(500).send({
                       message: err.message || "Internal Server Error. Please try again"
                   })
                                   
               } else if(data !== undefined) {
                                   
                       res.status(201).send({
                           statusName: 'Created',
                           statusCode: 201,
                           message: 'Account created successfully',
                           data : data
                       });
                   }
           })   
       }
}

exports.getBooks = (req, res) => {
    const { page = 1, pageSize = 10 } = req.params;
    const pageInt = parseInt(page)+1
           Book.getBooks(pageInt, pageSize, (err,data) => {
               if(err) {
                   res.status(500).send({
                       message: err.message || "Internal Server Error. Please try again"
                   })
                                   
               } else if(data !== undefined) {
                   
                       res.status(200).send({
                           statusName: 'Ok',
                           statusCode: 200,
                           data: data
                       });
                   }
           })   
}

exports.editBook = (req, res) => {
    const user = req.user.data.name
    console.log(user)
    const {book_id, title, pages, category } = req.body;
    if (  title == null  || title.length < 1  || pages == null   || category == null  || pages.length < 1  || category.length < 1 ) {
           res.status(400).send({
               statusName: 'Bad Request',
               statusCode: 400,
               message: "Can not edit book please check Title, Pages and Category  "
           });
       }else {
          
           Book.editBook(user, book_id, title, pages, category, (err,data) => {
               if(err) {
                   res.status(500).send({
                       message: err.message || "Internal Server Error. Please try again"
                   })
                                   
               } else if(data !== undefined) {
                                   
                       res.status(200).send({
                           statusName: 'Ok',
                           statusCode: 200,
                           message: 'Updated Successfully',
                           data : data
                       });
                   }
           })   
       }
}

exports.searchBook = (req, res) => {
    const {title, page = 1, pageSize = 10 } = req.params;
           Book.searchBook(title, page, pageSize, (err,data) => {
               if(err) {
                   res.status(500).send({
                       message: err.message || "Internal Server Error. Please try again"
                   })
                                   
               } else if(data !== undefined) {
                   
                       res.status(200).send({
                           statusName: 'Ok',
                           statusCode: 200,
                           data : data
                       });
                   }
           })   
}

exports.deleteBook = (req, res) => {
    const {book_id} = req.body;
           Book.deleteBook(book_id, (err,data) => {
               if(err) {
                   res.status(500).send({
                       message: err.message || "Internal Server Error. Please try again"
                   })
                                   
               } else if(data !== undefined) {
                   
                       res.status(200).send({
                           statusName: 'Ok',
                           statusCode: 200,
                           data : {
                               message: 'Successfully Deleted'
                           }
                       });
                   }
           })   
}
