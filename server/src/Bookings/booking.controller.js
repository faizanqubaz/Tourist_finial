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
            hotel_id:req.body.hotelId,
            email:req.body.email
        });
        res.json(newBooking);
      } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'An error occurred while creating the booking.' });
      }
}

const updateBookingStatus = async (req, res) => {
  const guestId = req.params.id;
  
console.log('roomid',guestId)

  try {
    const updatedGuest = await Bookings.query()
      .findById(guestId)
      .patch({ payment_verified: true });

    if (!updatedGuest) {
      throw new Error('Guest not found or update failed');
    }

    console.log('rrererere',updatedGuest)
    res.json(updatedGuest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the room.' });
  }
}


const ONESIGNAL_APP_ID = 'YOUR_ONE_SIGNAL_APP_ID';
const ONESIGNAL_REST_API_KEY = 'YOUR_ONE_SIGNAL_REST_API_KEY';

// Function to send a push notification
async function sendPushNotification(playerIds, title, message) {
  const headers = {
    'Authorization': `Basic ${ONESIGNAL_REST_API_KEY}`,
    'Content-Type': 'application/json',
  };
  
  const data = {
    app_id: ONESIGNAL_APP_ID,
    include_player_ids: playerIds,
    headings: { en: title },
    contents: { en: message },
  };

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', data, { headers });
    console.log('Push notification sent:', response.data);
  } catch (error) {
    console.error('Error sending push notification:', error.response.data);
  }
}

// Example usage
const playerIds = ['PLAYER_ID_1', 'PLAYER_ID_2'];
const title = 'Booking Confirmation';
const message = 'Your booking has been confirmed. Thank you!';

sendPushNotification(playerIds, title, message);


module.exports={
  updateBookingStatus,
    saveBookings
}