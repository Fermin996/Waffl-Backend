const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
require('dotenv').config()

const userRoutes = require('./routes/user-routes')
const checkRoutes = require('./routes/check-routes')
const shiftRoutes = require('./routes/shift-routes')
const tableRoutes = require('./routes/table-routes')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next()
})

app.use('/user', userRoutes)
app.use('/table', tableRoutes)
app.use('/check', checkRoutes)
app.use('/shift', shiftRoutes)

mongoose
    .connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@cluster0.vzjyi.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(process.env.PORT || 5000)
    })
    .catch((err)=>{
        console.log(err)
    })