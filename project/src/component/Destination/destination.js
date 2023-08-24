import React, { useEffect, useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import './destination.css'
import axios from 'axios'
const HotelDestinations = () => {
  const history=useHistory()
  const [location, setLocation] = useState('');
  const [hotels, setHotels] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/v1/hotel/gethotels?location=${location}`);
      const data = await response.json();
      setHotels(data);
      console.log('hotels',hotels)
    } catch (error) {
      console.error('Error searching hotels:', error);
    }

  };

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    description:'',
    cnic:'',
    number_of_rooms:'',
    number_of_person:'',
    country:'',
    checkInDate: '',
    checkOutDate: '',
    hotelId:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  const handleAvailabilityClick=async(value)=>{
console.log('valuessss',value)
    const response = await axios(`http://localhost:4000/v1/hotel/getroombyId?location=${value}`);
    if(response.status==200){
      if (response.data.length===0){
    
      }
      history.push('/guides', response.data);
    }
     }


  const handleBookingSubmit = async() => {
    // Handle booking submission logic here
    // console.log('Booking submitted:', bookingDetails);
   
    bookingDetails.hotelId=selectedHotel.id
    try {
      const ddd=await axios.post('http://localhost:4000/v1/booking/save', bookingDetails);
  
      setIsBooked(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
    // Close the modal after submission
    setTimeout(()=>{
      setIsPopupOpen(!isPopupOpen);
      setIsBooked(false);
    },3000)
    
  };


  const togglePopup = (hotel) => {
    setSelectedHotel(hotel); 
    setIsPopupOpen(!isPopupOpen);
  };
    return (
        <div>
      <h2 className='destinationsearch'>Hotel Search</h2>
     <div className='destination_nearby'>
     <input
        type="text"
        placeholder="Enter location"
        value={location}
        className='destination_input'
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className='destination_btn' onClick={handleSearch}>Search Hotels</button>
     </div>
      <div className="hotels-list">
      {hotels.map((hotel, index) => (
        <div className="hotel-card" key={index}>
          <img className="hotel-image" src={`http://localhost:4000${hotel.imageUrl}`} alt={hotel.name} width="300" />
          <div className="hotel-details">
            <h2 className="hotel-name">{hotel.name}</h2>
            <p className="hotel-location">{hotel.location}</p>
            <p className="hotel-description">{hotel.description}</p>
            <p className="hotel-price">${hotel.price} per night</p>
            <div style={{display:'flex',justifyContent:'space-between',width:'107%'}}>
            <button className="check_btn_availability" onClick={() => handleAvailabilityClick(hotel.id)}>Check Availability</button>
            <button
  className="whatsapp-button_1"
  onClick={() => {
    console.log('dddd',hotel.whatsapp_number)
    const countryCode = '92';
    const phoneNumber = `${hotel.whatsapp_number}`;
    const whatsappUrl = `https://wa.me/${countryCode}${phoneNumber}`;
    
    window.open(whatsappUrl, '_blank');
  }}
>
  Contact via WhatsApp
</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
       
      );  
};

export default HotelDestinations;