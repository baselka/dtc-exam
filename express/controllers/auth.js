const Auth = require('../models/authModel')
const JWT = require('../utils/jwt')
const Crypto = require('../utils/sha-crypto')
const Secret = require('../utils/2fa')

exports.signup = (req, res) => {
    const {name, email, password } = req.body;
 if (  name == null  || name.length < 1  || email == null   || password == null  || email.length < 1  || password.length < 1 ) {
        res.status(400).send({
            statusName: 'Bad Request',
            statusCode: 400,
            message: "Can not sign up please check Email and Password  "
        });
    }else {
       
        Auth.signup(name, email, password, (err,data) => {
            if(err) {
                res.status(500).send({
                    message: err.message || "Internal Server Error. Please try again"
                })
                                
            } else if(data !== undefined) {
                console.log(data)
                if(data && data.keyPattern){
                    return res.status(409).send({
                        statusName: 'Duplicated',
                        statusCode: 409,
                        message: 'User already exist'
                    });
                }
                
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

exports.login = (req, res) => {
    const { email, password } = req.body;
    const encPwd =  Crypto.encryptPassword(password)
    if (email === undefined || password === undefined || email.length < 1 || password.length < 1) {
        res.status(400).send({
            statusName: 'Bad Request',
            statusCode: 400,
            message: "Login credintials not provided"
        });
    } else {
       
        Auth.login(email, encPwd, (err,data) => {
            if(err) {
                res.status(500).send({
                    message: err.message || "Internal Server Error. Please try again"
                });
            } 
           
            if(data === null || data === undefined) {
               return res.status(401).send({
                    statusName: 'Unauthorized',
                    statusCode: 401,
                    message:  'Invalid Username or Password try again .'
                });  
                                  
            }
            
            
                const token = JWT.signUser(data._id)
              
                res.status(200).send({
                    statusName: 'Ok',
                    statusCode: 200,
                    data : {
                        user: data,
                        auth_token: token
                    }
                });
      
            })   
        }
    }    