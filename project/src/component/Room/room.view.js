import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import '../hotels/nearby.css'
import '../Destination/destination.css'
import axios from 'axios'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const RoomViewPage=()=> {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
  const location = useLocation();
  const receivedData = location.state;
console.log('rese',receivedData)

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
      const bookingGuest=await axios.post('http://localhost:4000/v1/booking/save', bookingDetails);
    //   here we wana update the rooms id to set availability to no
    const bookedGuestId=bookingGuest.data.id
    const response = await axios.put(`http://localhost:4000/v1/rooms/update/${selectedHotel.name}`, {
        guestId:bookedGuestId
    });
    console.log('Updated Room:', response.data);
  
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


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };


  const togglePopup = (hotel) => {
    setSelectedHotel(hotel); 
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
    
    <div className="hotels-list">
    {
  receivedData.length == 0 ? (
    <p className='potors_h2'>No Room Available for this Hotel</p>
  ) : (
    receivedData.map((hotel, index) => (
      <div className="hotel-card" key={index}>
        <img className="hotel-image" src={`http://localhost:4000${hotel.imageUrl}`} alt={hotel.name} width="300" />
        <div className="hotel-details">
            <div style={{display:'flex',alignItem:'center',justifyContent:'space-around',width:'41%'}}>
            <label>Availability: </label>
          <h2 className="hotel-name">{hotel.availability}</h2>
            </div>
          <p className="hotel-location">{hotel.phoneNumber}</p>
          <p className="hotel-description">{hotel.description}</p>
          <p className="hotel-price">{hotel.price}</p>
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
        <button className="close-popup-button" onClick={togglePopup}>Close</button>
      </div>
    </div>
          
        </div>
      )}

        </div>
      </div>
    ))
  )
    
    }
  </div>
  </div>
  );
}

export default RoomViewPage;