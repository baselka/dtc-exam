const crypto = require('crypto')

exports.encryptPassword = (password) => {
   const pwd = crypto.createHash('sha256').update(password).digest('base64')
   return pwd
}

exports.comparePasswords = (userPwd, dbPwd) => {
   if(self.encryptPassword(userPwd) === dbPwd){
      return true
   }
   return false
}