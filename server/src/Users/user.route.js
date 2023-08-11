const express =require('express');
const router=express.Router();
const {register,login,getHotels}=require('./user.controller')

router.post('/register',register);
router.post('/login',login)
router.get('/hotels',getHotels)


module.exports=router