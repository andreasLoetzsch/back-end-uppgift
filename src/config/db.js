const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.CONNECTION_STRING_DB)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('Error connecting to MongoDB', error.message)
    }
}

module.exports = connectDB;