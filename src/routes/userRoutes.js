const express = require('express');
const router = express.Router();
const {registerUser, logInUser} = require('../controllers/userController')

router.post('/register', registerUser)

router.post('/login', logInUser)


module.exports = router;