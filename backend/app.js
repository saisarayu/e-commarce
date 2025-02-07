const express=require('express')
const ErrorHandler = require('../utils/ErrorHandler')
const user=require('./controller/user')
const cors = require('cors')
const app = express()

app.use(cors())
app.user(express.json())
app.use(express.urlencoded({extended: true}))

if(process.env.NODE_ENV!=="PRODUCTION"){
   require('dotenv').config({path:"backgend/config/env"})


}
   app.use('/api',user)
   app.use(ErrorHandler)

module.exports=app