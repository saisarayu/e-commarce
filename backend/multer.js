const multer = require('multer')
const path = require('path')

const  storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/')

    },
    filename:(req,file,cb)=>{
        const uniqueSuffix =  Date.now()+Math.round(Math.random()*1e9)
        const fileName = file.originalname.split('.')[0]
        const fileExtention = path.extname(file.originalname)

        cb(null,fileName+uniqueSuffix+fileEctention)

    }
})
const upload = multer({storage:storage})
module.exports=upload



