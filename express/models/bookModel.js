const User = require('../DBSchema/User')

exports.addNewBook = (uid, title, pages, category, result) => { 
  
  const data = {
   
      title: title,
      pages: pages,
      category: category

  }

  User.findByIdAndUpdate(uid,{$push: {my_books: data}}, {upsert: true}, function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

       
}

exports.getBooks = async (uid, page, pageSize, result) => { 

  console.log('Pagination', )
  User.findById(uid, 'my_books', {sort:{my_books: -1}/* limit: pageSize * 1, skip:((page -1) * pageSize) */}, function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

}

exports.editBook = (uid, bookId,  title, pages, category, result) => { 
  
  const data = {
   
      title: title,
      pages: pages,
      category: category

  }
  console.log(bookId)

  User.f(uid,{$push: {my_books: data}}, {upsert: true}, function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

       
}

exports.searchBook = (uid, title, result) => { 
  console.log('QUERY', title)
  User.findOne(
    {my_books:{ "title": "One More Book", "pages": 100, "category": "Fitness" }},
    function(err, res) {
      if (err) {
        result(null, err)
      } else {
       console.log(res)
      }
    }
  );
       
}

exports.deleteBook = (uid, bookId, result) => { 
  

  User.findByIdAndDelete(uid, 'my_books', function (err, res) {
    if(err){
      return result(null, err)
    }
    console.log(res)
    result(null, res)
  })

       
}
