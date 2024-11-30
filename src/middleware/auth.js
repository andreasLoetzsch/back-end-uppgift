const jwt = require('jsonwebtoken')

const authUser = (req, res, next) => {
    const token = req.headers['authorization']
    // res.json({token, key: process.env.TOKEN_KEY})
    if(!token || token == 'undefined'){
       return next()
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err){
            return res.status(401).json({message: 'invalid token'})
        }
        req.user = decoded;
        next()
    })
}

module.exports = {authUser}