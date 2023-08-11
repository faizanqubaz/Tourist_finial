import React, { useEffect, useState } from 'react';
import './destination.css'
import axios from 'axios'
const HotelDestinations = () => {
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
            <button className="book-button" onClick={() => togglePopup(hotel)}>Book Now</button>
            {isPopupOpen && (
        <div className="booking-popup">
          <div className="modal-overlay">
      <div className="booking-modal">
      {isBooked && <p className="success_message">Booking successful! We look forward to hosting you.</p>}
        <h2>Book Room at {selectedHotel.name}</h2>
        <label>Name:</label>
        <input type="text" name="name" value={bookingDetails.name} onChange={handleInputChange} />
        <input type="hidden" name="hotelid" onChange={handleInputChange} />
        <label>Email:</label>
        <input type="email" name="email" value={bookingDetails.email} onChange={handleInputChange} />
        <label>NumberOf_Rooms:</label>
        <input type="text" name="rooms" value={bookingDetails.number_of_rooms} onChange={handleInputChange} />
        <label>CNIC:</label>
        <input type="text" name="cnic" value={bookingDetails.cnic} onChange={handleInputChange} />
        <label>Country:</label>
        <input type="text" name="country" value={bookingDetails.country} onChange={handleInputChange} />
        <label>Check-in Date:</label>
        <input type="date" name="checkInDate" value={bookingDetails.checkInDate} onChange={handleInputChange} />
        <label>Check-out Date:</label>
        <input type="date" name="checkOutDate" value={bookingDetails.checkOutDate} onChange={handleInputChange} />
        <button className="submit-button" onClick={handleBookingSubmit}>Submit</button>
        {/* <button className="close-button" onClick={onClose}>Close</button> */}
        <button className="close-popup-button" onClick={togglePopup}>Close</button>
      </div>
    </div>
          
        </div>
      )}
          </div>
        </div>
      ))}
    </div>
    </div>
       
      );  
};

export default HotelDestinations;