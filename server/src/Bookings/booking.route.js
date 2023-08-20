const express =require('express');
const router=express.Router();
const {saveBookings,updateBookingStatus}=require('./booking.controller')


router.post('/save',saveBookings)
router.put('/update/:id',updateBookingStatus)


module.exports=router