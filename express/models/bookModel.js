const Book = require('../DBSchema/Book')

exports.addNewBook = (user, title, pages, category, result) => { 
  
  const data = new Book({
   
      title: title,
      pages: pages,
      category: category,
      added_by: user

  })

  data.save( function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

       
}

exports.getBooks = async (page, pageSize, result) => { 
  const count = await Book.countDocuments()
console.log(count)
  Book.find().sort({_id:-1}).limit(pageSize * 1).skip((page - 1) * pageSize).exec().then(res => {
          result(null,{
              totalPages: Math.ceil(count / pageSize),
              currentPage: page,
              statusCode: 200,
              books:res,
          })
      })
      .catch(error => {
          return result(null, error)
      })

}
exports.searchBook = async (title, page, pageSize, result) => { 
  const count = await Book.countDocuments()
console.log(count)
  Book.find({title: title}).sort({_id:-1}).limit(pageSize * 1).skip((page - 1) * pageSize).exec().then(res => {
          result(null,{
              totalPages: Math.ceil(count / pageSize),
              currentPage: page,
              statusCode: 200,
              books:res,
          })
      }).catch(error => {
        console.log(error)
           //result(null, error)
      })

}

exports.editBook = (user, bookId,  title, pages, category, result) => { 
 

  Book.findByIdAndUpdate(bookId,{title: title, pages: pages, category: category, modified_by: user}, function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

       
}

exports.deleteBook = (bookId, result) => { 
  
  Book.findByIdAndDelete(bookId, function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

       
}
