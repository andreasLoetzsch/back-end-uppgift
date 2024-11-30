const User = require('../models/user');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { username, password, email } = req.body
    try {
        const newUser = new User({ username, password, email })
        const user = await newUser.save()
        res.status(201)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

const logInUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({ message: 'User not found' })
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
          )
        
        res.status(200).json({token})


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { registerUser, logInUser }