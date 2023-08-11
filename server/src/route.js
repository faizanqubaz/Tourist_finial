const express =require('express');
const router=express.Router();
const userRoute= require('./Users/user.route')
const hotelRoute=require('./Hotels/hotel.route')
const bookingRoute=require('./Bookings/booking.route')

router.use('/user',userRoute)
router.use('/hotel',hotelRoute)
router.use('/booking',bookingRoute)


module.exports=router