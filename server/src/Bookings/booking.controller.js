const {Hotel} = require('../Hotels/hotel.model')
const jwt=require('jsonwebtoken');
const axios =require('axios');
const { Bookings } = require('./booking.model');


const saveBookings = async(req,res) =>{
    try {
        console.log('req',req.body)
        const newBooking = await Bookings.query().insert({
            name:req.body.name,
            description:req.body.description,
            cnic:req.body.cnic,
            country:req.body.country,
            checkIn_date:req.body.checkInDate,
            checkOut_date:req.body.checkOutDate,
            hotel_id:req.body.hotelId
        });
        res.json(newBooking);
      } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'An error occurred while creating the booking.' });
      }
}

module.exports={

    saveBookings
}