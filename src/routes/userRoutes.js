const express = require('express');
const router = express.Router();
const {registerUser, logInUser, getUser, updateUser, deleteUser} = require('../controllers/userController')
const {authUser} = require('../middleware/auth')

router.post('/register', registerUser)

router.post('/login', logInUser)

router.get('/', authUser, getUser)

router.patch('/', authUser, updateUser)

router.delete('/', authUser, deleteUser)


module.exports = router;