import React, { useEffect, useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import './nearby.css'
import axios from 'axios'
const HotelDestinations = () => {
  const history=useHistory()
  const [location, setLocation] = useState('');
  const [hotels, setHotels] = useState([]);

  const handleSearch = async () => {
     
    try {
      const response = await fetch(`http://localhost:4000/v1/hotel/getdestination?location=${location}`);
      console.log('response',response)
      const data = await response.json();
      setHotels(data);
      console.log('hotels',hotels)
    } catch (error) {
      console.error('Error searching hotels:', error);
    }

  };

 const handleBPotorClick=async(value)=>{
const response = await axios(`http://localhost:4000/v1/hotel/getpotors?location=${value}`);
if(response.status==200){
  console.log('pat',response.data)
  if (response.data.length===0){

  }
  const dataToSend = { message: value };
       history.push('/potors', response.data);
}
 }
  

    return (
        <div>
      <h2 className='nearbysearch'>Destination Search</h2>
      <div className='container_nearby'>
      <input className='nearby_input'
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className='nearby_btn' onClick={handleSearch}>Search Your Destinations</button>
      </div>
      <div className="hotels-list">
      {hotels.map((hotel, index) => (
        <div className="hotel-card" key={index}>
          <img className="hotel-image" src={`http://localhost:4000${hotel.imageUrl}`} alt={hotel.name} width="300" />
          <div className="hotel-details">
            <h2 className="hotel-name">{hotel.name}</h2>
            <p className="hotel-location">{hotel.address}</p>
            <p className="hotel-description">{hotel.description}</p>
            <p className="hotel-price">{hotel.rating}</p>
            <button  onClick={() => handleBPotorClick(hotel.address)} className='destination_poters'>Nearby Guides</button>
          </div>
        </div>
      ))}
    </div>
    </div>
       
      );  
};

export default HotelDestinations;