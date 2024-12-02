const jwt = require('jsonwebtoken')

const authUser = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token || token == 'undefined'){
        req.isLoggedIn = false
       return next()
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err){
            req.isLoggedIn = false
            return res.status(401).json({message: 'invalid token'})
        }
        req.user = decoded;
        req.isLoggedIn = true
        next()
    })
}

module.exports = {authUser}