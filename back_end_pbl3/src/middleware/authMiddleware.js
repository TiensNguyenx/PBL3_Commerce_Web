const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const publickey = path.resolve(__dirname, '..', 'config', 'publickey.crt');
const cert = fs.readFileSync(publickey);
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, cert,{algorithm: 'RS256'}, function(err, user){
        if(err){
            return res.status(404).json({
                status: 'ERR',
                message: 'Unauthorized'
            })
        }
        const  {payload} = user
        if(payload?.isAdmin){
            next()
        }else{
            return res.status(404).json({
                status: 'ERR',
                message: 'Unauthorized'
            })
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    console.log('token', token)
    const userId = req.params.id;
    console.log('userId', userId)
    jwt.verify(token, cert,{algorithm: 'RS256'}, function(err, user){
        if(err){
            return res.status(404).json({
                status: 'ERR', 
                message: 'Unauthorized'
            })
        }
        console.log('user', user)
        const  {payload} = user
        if(payload?.isAdmin || payload?.id == userId){
            next()
        }else{
            return res.status(404).json({
                status: 'ERR',
                message: 'Unauthorized'
            })
        }
    });
}

module.exports = {
    authMiddleware,
    authUserMiddleware,
} 