const express =require('express');
const router=express.Router();
const {getHotelDetails,AddHotel,getDestinationDetails,getPotorsDetails,getRoomById}=require('./hotel.controller')


router.get('/gethotels',getHotelDetails)
router.get('/getdestination',getDestinationDetails)
router.get('/getpotors',getPotorsDetails)
router.get('/getroombyId',getRoomById)
router.post('/addhotel',AddHotel)

module.exports=router