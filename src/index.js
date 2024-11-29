const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.listen(PORT, (req, res) => {
    console.log(`Listening on port: ${PORT}`);
})