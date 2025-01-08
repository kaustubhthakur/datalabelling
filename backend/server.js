const express = require('express')
const app = express();
const port = 9000;
const mongoose = require('mongoose')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const authrouter = require('./routes/auth')
require('dotenv').config();
app.use(express.json());
app.use(cookieparser())
app.use(cors())
const connection = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('db is connected...')
    } catch (error) {
        console.error(error);
    }
}
app.use('/auth',authrouter)
app.listen(port,() => {
    console.log(`server is running on port ${port}...`)
})