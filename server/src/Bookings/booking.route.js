const express =require('express');
const router=express.Router();
const {saveBookings}=require('./booking.controller')


router.post('/save',saveBookings)


module.exports=router