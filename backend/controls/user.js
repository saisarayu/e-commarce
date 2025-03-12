const express = require('express')
const {upload} = require('../multer')
const user = require('../models/user')
const path = require('path')
const ErrorHandler = require('../utils/ErrorHandler')
const { appendFile } = require('fs')

const router=express.Router()

router.post('/create',async(req,res,next)=>{
    try{
        const {name,email,password}=req.body
        const exitUser=user.findOne(email)
        if(exitUser)
            return res.status(400).send('user already registered')

        const createUser = new User({
            name,email,password
        })
           await createUser.save() 
          console.log(createUser)
        }
         catch(e){
            console.log(e.message)

         }




})

    module.exports=app 
    
