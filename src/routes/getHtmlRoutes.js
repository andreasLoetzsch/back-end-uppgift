const {authUser} = require('../middleware/auth')
const fs = require('fs');

const express = require('express');
const router = express.Router()
const path = require('path')

router.get('/sign-in', authUser, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/signin.html'))

});
router.get('/page-init', authUser, (req, res) =>{
    const filePath = req.isLoggedIn
        ? path.join(__dirname, '../../public/userProfile.html') 
        : path.join(__dirname, '../../public/register.html'); 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load page content' });
        }


        res.json({
            isLoggedIn: req.isLoggedIn,
            content: data,
        });
    });
})

module.exports = router