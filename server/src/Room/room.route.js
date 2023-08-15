const express =require('express');
const router=express.Router();
const {UpdateRoomById}=require('./room.controller')


router.put('/update/:id',UpdateRoomById)


module.exports=router