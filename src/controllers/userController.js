const { CancelToken } = require('axios');
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
        
        res.status(200).json({token, userId: user._id})


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

const getUser = async (req, res) =>{
    if(!req.isLoggedIn){
        return res.status(401).json({message: 'unathorized'})
    }
    const user = await User.findOne({username: req.user.username})
    res.json({user})
}

const updateUser = async (req, res)=>{
    try {
        const { id } = req.user; 
        const updates = req.body; 
    
        const updatedUser = await User.findByIdAndUpdate(
          id,             
          updates,          
          { new: true, runValidators: true } 
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign(
            { id: req.user.id, username: updates.username },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
          )
    
        res.json({ message: 'user updated', token }); 
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
      }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.user; 
        const deletedUser = await User.findByIdAndDelete(id);
    
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json({ message: 'user has been deleted'}); 
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
      }
}

module.exports = { registerUser, logInUser, getUser, updateUser, deleteUser }
