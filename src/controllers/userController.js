const User = require('../models/user');

const registerUser = async (req, res) => {
    const { username, password, email } = req.body
    try {
        const newUser = new User({ username, password, email })
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
}

module.exports = { registerUser }