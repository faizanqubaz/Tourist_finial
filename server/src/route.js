const express =require('express');
const router=express.Router();
const userRoute= require('./Users/user.route')

router.post('/register',userRoute)


module.exports={
    router
}