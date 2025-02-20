const express=require('express')
const ErrorHandler = require('../backend/utils/Error')
const user=require('../backend/controls/user')

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
