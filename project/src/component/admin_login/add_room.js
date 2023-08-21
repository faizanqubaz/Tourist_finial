import React, { useState } from 'react';
import './add_room.css'
const RoomAddition = ({ onRoomsAdded,hname }) => {
  const [numberOfRooms, setNumberOfRooms] = useState(0);

  const handleAddRooms = () => {
    if (numberOfRooms > 0) {
      const roomsToAdd = new Array(numberOfRooms).fill(null).map((_, index) => `Room ${index + 1}`);
      onRoomsAdded(roomsToAdd);
    }
  };

  return (
    <div className='addroom_container'>
        <div className='add_room_head'>
        <h2 className='add_room_heading'>ADD Rooms To: {hname} Hotel:</h2>
        </div>
      
     <div className='admin_addroom_inp_con'>
     <input
      className='add_room_input'
        type="number"
        placeholder="Number of rooms"
        value={numberOfRooms}
        onChange={(e) => setNumberOfRooms(parseInt(e.target.value))}
        required
      />
      <button className='addroom_btn' onClick={handleAddRooms}>Add Rooms</button>
     </div>
    </div>
  );
};

export default RoomAddition;
