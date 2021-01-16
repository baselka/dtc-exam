
const User = require('../DBSchema/User.js')
const Encrypt = require('../utils/sha-crypto.js')
const { $where } = require('../DBSchema/User.js')

exports.signup = (name, email, password, result) => {  
  
  const data = new User ({
    name: name,
    email: email,
    password: Encrypt.encryptPassword(password)
  })

  data.save(function (err, res) {
    if(err){
      return result(null, err)
    }
    result(null, res)
  })

    
}

exports.login = (email, password ,result) => { 
  
    User.findOne(({email: email, password: password}), function (err, res){
      if(err){
        return result(null, err)
      }
      
      result(null, res)
    })
       
}
