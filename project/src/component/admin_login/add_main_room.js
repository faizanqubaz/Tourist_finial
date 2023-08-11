// import React, { useState } from 'react';

// const DynamicInputAdder = () => {
//   const [numInputs, setNumInputs] = useState(0);
//   const [inputList, setInputList] = useState([]);

//   const handleNumInputsChange = (event) => {
//     const count = parseInt(event.target.value);
//     setNumInputs(count);
//     setInputList(new Array(count).fill(''));
//   };

//   const handleInputChange = (index, value) => {
//     const newList = [...inputList];
//     newList[index] = value;
//     setInputList(newList);
//   };
//   return (
//     <div>
//       <h2>Dynamic Input Adder</h2>
//       <label htmlFor="numInputs">Number of Inputs:</label>
//       <input
//         type="number"
//         id="numInputs"
//         value={numInputs}
//         onChange={handleNumInputsChange}
//       />

//       <h3>Inputs:</h3>
//       {inputList.map((inputValue, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => handleInputChange(index, e.target.value)}
//           />
//         </div>
//       ))}

//       <h3>Input List:</h3>
//       <ul>
//       {inputList.map((inputValue, index) => (
//           <li key={index}>{inputValue}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DynamicInputAdder;



import React, { useState } from 'react';


import RoomAddition from './add_room';
import './add_room.css'
import { useLocation } from 'react-router-dom';

const AddMainRoom = () => {
    const [formData, setFormData] = useState([
        { id: 1, roomnumber: '', roomsize: '',roomprice:'',attachbath:'',availability:'' },
        { id: 2, roomnumber: '', roomsize: '',roomprice:'',attachbath:'',availability:'' },
        { id: 3, roomnumber: '', roomsize: '',roomprice:'',attachbath:'',availability:'' },
        
      ]);
   
    const [hotelId, sethotelId] = useState('');
    const [hotelname, sethotelname] = useState('');
    const location = useLocation();
    const hotel_details = location.state;
 

  const [rooms, setRooms] = useState([]);
 

  const handleRoomsAdded = (newRooms) => {
    setRooms([...rooms, ...newRooms]);
  };
  const [inputList, setInputList] = useState([]);

  const handleInputChange = (index, value) => {
    const newList = [...inputList];
    console.log('newww',newList)
    newList[index].value = value;
    setInputList(newList);
  };
  return (
    <div>
        <RoomAddition onRoomsAdded={handleRoomsAdded} hname={hotel_details.name} />
      <div className='main_add_room_container'>
      <div className="hotels-list">
      {rooms.map((hotel, index) => (
        <div className="hotel-card" key={index}>
         
          <div className="hotel-details">
        <div>
        <label htmlFor="roomnumber">Room Number:</label>
        <input
          type="text"
          id="roomnumber"
          name="roomnumber"
        //   value={userData.firstName}
        onChange={(e) => handleInputChange(index, e.target.value)}

        />
        </div>

<div>
<label htmlFor="roomsize">Room Size:</label>
        <input
          type="text"
          id="roomsize"
          name="roomsize"
          onChange={(e) => handleInputChange(index, e.target.value)}

        //   value={userData.firstName}
        //   onChange={handleInputChange}
        />
</div>

<div>
<label htmlFor="roomprice">Price:</label>
        <input
          type="text"
          id="roomprice"
          name="roomprice"
          onChange={(e) => handleInputChange(index, e.target.value)}

        //   value={userData.firstName}
        //   onChange={handleInputChange}
        />
</div>

<div>
<label htmlFor="attachbath">BathRoom:</label>
        <input
          type="text"
          id="attachbath"
          name="attachbath"
        //   value={userData.firstName}
        onChange={(e) => handleInputChange(index, e.target.value)}


        />
</div>

<div>
<label htmlFor="availability">Availability:</label>
        <input
          type="text"
          id="availability"
          name="availability"
        //   value={userData.firstName}
        onChange={(e) => handleInputChange(index, e.target.value)}


        />
</div>
            
          </div>
        </div>
      ))}
     
    </div>
    <button   className='destination_poters'>SAVE</button> 
      </div>
    </div>
  );
};

export default AddMainRoom