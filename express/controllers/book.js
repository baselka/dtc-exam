const Book = require('../models/bookModel.js')
const userId = require('../utils/jwt')
exports.addNewBook = (req, res) => {
    const uid = req.user.data
    const {title, pages, category } = req.body;
    if (  title == null  || title.length < 1  || pages == null   || category == null  || pages.length < 1  || category.length < 1 ) {
           res.status(400).send({
               statusName: 'Bad Request',
               statusCode: 400,
               message: "Can not your book please check Title, Pages and Category  "
           });
       }else {
          
           Book.addNewBook(uid, title, pages, category, (err,data) => {
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
    const uid = req.user.data
    const {page, pageSize} = req.params;
          console.log('PAGINATION', pageSize)
           Book.getBooks(uid, page, pageSize, (err,data) => {
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

exports.editBook = (req, res) => {
    const uid = req.user.data
    const {book_id, title, pages, category } = req.body;
    if (  title == null  || title.length < 1  || pages == null   || category == null  || pages.length < 1  || category.length < 1 ) {
           res.status(400).send({
               statusName: 'Bad Request',
               statusCode: 400,
               message: "Can not edit book please check Title, Pages and Category  "
           });
       }else {
          
           Book.editBook(uid, book_id, title, pages, category, (err,data) => {
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
    const uid = req.user.data
    const {title} = req.params;
           Book.searchBook(uid, title, (err,data) => {
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
    console.log(req.body)
    const uid = req.user.data
    const {book_id} = req.body;
           Book.deleteBook(uid, book_id, (err,data) => {
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
