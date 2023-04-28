const express = require('express')
const limitter = require('express-rate-limit')
const app = express()
const mongoose = require('mongoose')
const route = require('./src/router')
const errorMiddleware = require('./src/middleware/errorMiddleware')
app.use(limitter(
    {
        windowMs:15000 ,// 5 sec,
        max:7,
        message:`too many request try again after some time`
    }
))
app.use(express.json())

mongoose.connect('mongodb+srv://betechnoid:Abhishek8285366507@cluster0.ctbkbk3.mongodb.net/bloggingplatform?retryWrites=true&w=majority',{useNewUrlParser:true}).then(()=>console.log(`mongodb is connected`)).catch((e) => console.log(e.message))

app.use('/',route)

app.listen((process.env.PORT||3000),() => console.log(`server is running on port number 3000`))

app.use(errorMiddleware)

