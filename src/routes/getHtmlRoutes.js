const {authUser} = require('../middleware/auth')

const express = require('express');
const router = express.Router()
const path = require('path')

router.get('/sign-in', authUser, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/signin.html'))
    // res.json({user: req.user})
});

module.exports = router