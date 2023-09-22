const express = require("express");
const dotenv=require("dotenv").config()
const { errorHandler } = require('./middleWare/errorHandler.js')
const connectDB = require ('./config/database.js')
const router = require('./api/jobData/jobData.router.js')

connectDB()

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(errorHandler)

app.use('/api/jobdata', router)
app.use('/api/users', require('./api/users/users.router.js'))

app.listen(PORT, (error) => {
    if (error) { throw error } else {
    console.log(`app is listening at http://localhost:${PORT} `)
}})