const { Hotel } = require('../Hotels/hotel.model')
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { upload } = require('../app');

const { Room } = require('../Room/room.model');


const UpdateRoomById = async (req, res) => {
    const roomId = req.params.id;
    const updatedData = req.body; // Assuming your frontend sends the updated data
  console.log('roomid',roomId)
  console.log('updated',updatedData)
    try {
      const updatedRoom = await Room.query()
      .patch({
        availability:'no',
        guest_id:updatedData.guestId
      }).where('name', roomId);
      res.json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the room.' });
    }
}
module.exports = {
    UpdateRoomById
}