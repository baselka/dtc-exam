const jwt = require('jsonwebtoken')

exports.signUser =  (id, res) => {
  try {
    const token = jwt.sign({
      data: id
    }, 'token');
   return token
  } catch (e) {
    return res.status(401).send({
      message: `Unable to sign user ${e}`
    }) 
  }
  
} 

exports.verifyToken = (req, res, next) => {
    const bearer = req.headers.authorization && req.headers.authorization.split(' ')
    const bearerToken = bearer && bearer[1]
    
    if (!req.headers.authorization) {

      return  res.status(401).send({
        message: 'No Authorization Token.'
      })
    }
    try {
      const decoded = jwt.verify(bearerToken, 'token')
      req.user = decoded 
      next()
    } catch (e) {

      return res.status(403).send({
        message: 'Invalid Token'
      })
    }

  }
