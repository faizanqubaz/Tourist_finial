const express =require('express');
const router=express.Router();
const {getHotelDetails,AddHotel,getDestinationDetails,getPotorsDetails}=require('./hotel.controller')


router.get('/gethotels',getHotelDetails)
router.get('/getdestination',getDestinationDetails)
router.get('/getpotors',getPotorsDetails)
router.post('/addhotel',AddHotel)

module.exports=router