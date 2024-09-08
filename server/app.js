const express =require('express');
const mongoose= require('mongoose');
const cors= require('cors');

const storyRoutes=require('./routes/storyRoute')

require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json())




mongoose.connect(process.env.MONGO_URI).then(
    ()=> console.log("database connected")
).catch(err=> console.log(err))

app.use('/stories',storyRoutes)
module.exports= app