const express = require('express');
const router = express.Router()
const path = require('path')

router.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/signin.html'))
});

module.exports = router