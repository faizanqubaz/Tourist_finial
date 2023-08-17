const express =require('express');
const router=express.Router();
const {getHotelDetails,AddHotel,getDestinationDetails,getPotorsDetails,getRoomById,getHotelByID}=require('./hotel.controller')


router.get('/gethotels',getHotelDetails)
router.get('/getdestination',getDestinationDetails)
router.get('/getpotors',getPotorsDetails)
router.get('/getroombyId',getRoomById)
router.post('/addhotel',AddHotel)
router.get('/gethotelbyId',getHotelByID)

module.exports=router