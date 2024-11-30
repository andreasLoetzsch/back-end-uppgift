const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db')


require('dotenv').config();
const PORT = process.env.PORT
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

connectDB();


const defaultUrl = '/api'
app.use(`${defaultUrl}/user`, require('./routes/userRoutes'))
app.use(`${defaultUrl}/getHtml`, require('./routes/getHtmlRoutes'))

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.listen(PORT, (req, res) => {
    console.log(`Listening on port: ${PORT}`);
})