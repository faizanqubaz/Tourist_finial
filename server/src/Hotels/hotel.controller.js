const {Hotel} = require('../Hotels/hotel.model')
const jwt=require('jsonwebtoken');
const axios =require('axios');
const {upload} =require('../app');
const { Destination } = require('../Destinations/destination.model');
const { Portor } = require('../Portors/portors.model');
const { Room } = require('../Room/room.model');


const getHotelDetails = async(req,res) =>{
  try {
    const { location } = req.query;
    const findHotel = await Hotel.query()
  .where('location', 'ilike', `%${location}%`);
    res.json(findHotel);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

const getPotorsDetails = async(req,res) =>{
  try {
    const { location } = req.query;
    console.log('qqq', location)
    const findHotel = await Portor.query()
  .where('city', 'ilike', `%${location}%`)
  .orWhere('address', 'ilike', `%${location}%`);
  console.log('find',findHotel)
    res.json(findHotel);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

const getDestinationDetails = async(req,res) =>{
  try {
    const { location } = req.query;
    const findDest = await Destination.query()
  .where('city', 'ilike', `%${location}%`);
    res.json(findDest);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

const getRoomById = async(req,res)=>{
  const { location } = req.query;
  console.log('ll',location)
  const rooms = await Room.query()
  .where('hotel_id', location)
  .andWhere('availability', 'yes')
  res.json(rooms);
}

const AddHotel=async(req,res)=>{

    const { name, description,location,rating } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
console.log('reqqqq',req.body)
console.log('urrrr',imageUrl)
    try {
      const newHotel = await Hotel.query().insert({
        name,
        description,
        image: imageUrl,
        location,
        rating:parseInt(rating)
      });

      res.json(newHotel);
    } catch (error) {
      console.error('Error adding hotel:', error);
      res.status(500).json({ error: 'Error adding hotel' });
    }
 
}

const getHotelByID = async(req,res)=>{
  const { id } = req.query;

  try {
    const hotelInfo = await Hotel.query().findOne({ id });
    console.log('hotelInfo',hotelInfo)
    res.json(hotelInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

module.exports={
  AddHotel,
    getHotelDetails,
    getDestinationDetails,
    getPotorsDetails,
    getRoomById,
    getHotelByID
}