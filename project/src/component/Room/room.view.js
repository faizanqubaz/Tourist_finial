import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import '../hotels/nearby.css'
import '../Destination/destination.css'
import axios from 'axios'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HotelMap from '../GoogleMap/GoogleMap'
import Dashboard from '../Dashboard/Dashboard';
import {useHistory} from 'react-router-dom'


const RoomViewPage=()=> {
  const history=useHistory()
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const [hotelInfo, setHotelInfo] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errors,setErrors] = useState('')
  const location = useLocation();
  const receivedData = location.state;
console.log('rese',receivedData[0]?.hotel_id)

const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    description:'',
    cnic:'',
    number_of_rooms:'',
    number_of_person:'',
    country:'',
    checkInDate: new Date().toISOString().substr(0, 10), // Initialize with current date
    checkOutDate: new Date().toISOString().substr(0, 10),
    hotelId:'',
    price:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });

   
    if (name === 'number_of_rooms') {
      const checkInDate = new Date(bookingDetails.checkInDate);
      const checkOutDate = new Date(bookingDetails.checkOutDate);
      const nights = parseInt(bookingDetails.number_of_rooms);
      const night = parseInt(value);
  
      if (!isNaN(nights) && nights > 0 && checkInDate instanceof Date && isFinite(checkInDate) && checkOutDate instanceof Date && isFinite(checkOutDate)) {
        const timeDiffInMilliseconds = checkOutDate - checkInDate;
        console.log('act',night)
        const timeDiffInDays = Math.ceil(timeDiffInMilliseconds / (1000 * 60 * 60 * 24));
        console.log('days',timeDiffInDays)
        console.log('selected',selectedHotel.price)
         // Convert milliseconds to days
        const totalPrice = timeDiffInDays * parseFloat(selectedHotel.price);
        console.log('price',totalPrice)
  
        setBookingDetails({
          ...bookingDetails,
          [name]: value,
          price: totalPrice.toFixed(2)*night,
        });
      } else {
        setBookingDetails({
          ...bookingDetails,
          [name]: value,
          price: '',
        });
      }
    } else {
      setBookingDetails({
        ...bookingDetails,
        [name]: value
      });
    }

 


  };

  const handleBookingSubmit = async() => {
    // Handle booking submission logic here
    // console.log('Booking submitted:', bookingDetails);
      
    bookingDetails.hotelId=receivedData[0]?.hotel_id;
    console.log('booking_detailssss',bookingDetails)
    try {
      const bookingGuest=await axios.post('http://localhost:4000/v1/booking/save', bookingDetails);
    //   here we wana update the rooms id to set availability to no
   
    // const bookedGuestId=bookingGuest.data.id
    // const response = await axios.put(`http://localhost:4000/v1/rooms/update/${selectedHotel.name}`, {
    //     guestId:bookedGuestId
    // });

    const hotelRes = await axios.get(`http://localhost:4000/v1/hotel/gethotelbyId?id=${receivedData[0]?.hotel_id}`);
    console.log('hotelRes',hotelRes)
    let bookingPersonData=bookingDetails;
    bookingPersonData.hotelEmail=hotelRes.data.email;
    bookingPersonData.roomname=selectedHotel.name
    bookingPersonData.bookingPersonId=bookingGuest.data.id
    bookingPersonData.hotelLatitude=hotelRes.data.latitude
    bookingPersonData.hotelLongitude=hotelRes.data.longitude
    bookingPersonData.hotelName=hotelRes.data.name 
    // console.log('bookingPersonData',bookingPersonData)

    await axios.post('http://localhost:4000/v1/api/sendemail', {
      hotelEmail: bookingPersonData.hotelEmail,
      bookingDetails: bookingPersonData
    });

    // Trigger a notification to the user
try {
  // const response = await axios.post('http://localhost:4000/v1/api/sendnotification', {
  //   userId: receivedData[0]?.user_id, // Assuming you have user ID associated with the booking
  //   message: 'Your booking was successful!'
  // });
  // console.log('Notification sent:', response.data);

} catch (error) {
  console.error('Error sending notification:', error);
}

    // const hotelLocation = {
    //   latitude: hotelRes.data.latitude, // Replace with actual latitude
    //   longitude: hotelRes.data.longitude,
    //   name:hotelRes.data.name // Replace with actual longitude
    // };
    
    // Combine hotel information and hotelLocation
    // const updatedHotelInfo = { ...hotelInfo, hotelLocation };
    
    // Store updated hotel information in local storage
    // localStorage.setItem('hotelInfo', JSON.stringify(updatedHotelInfo));
    // setHotelInfo(hotelRes.data)
    // console.log('hotelRes',hotelRes.data.latitude)
    // console.log('hotelRes',hotelRes.data.longitude)
    // setHotelInfo(response.data);
      // setIsBooked(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
    setTimeout(() => {
      setSuccessMessage(true);
    }, 1000);
    // Close the modal after submission
    setTimeout(()=>{
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('stored',storedUserInfo)
      history.push('/dashboard');
    },9000)
    
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
    setSuccessMessage(false); // Reset success message
    setIsBooked(false); // Reset booking status
    setBookingDetails({
      ...bookingDetails,
      checkInDate: new Date().toISOString().substr(0, 10),
      checkOutDate: new Date().toISOString().substr(0, 10),
      price: '',
    });
  };
console.log('llll',receivedData)
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
            <div style={{display:'flex',alignItem:'center',justifyContent:'space-between',width:'41%',padding:'4px 8px',alignItems:'center'}}>
            <label>Availability: </label>
          <p className="hotel-name">{hotel.availability}</p>
            </div>
            <div style={{display:'flex',alignItem:'center',justifyContent:'space-between',width:'41%',padding:'4px 8px',alignItems:'center'}}>
            <label>Name: </label>
          <p className="hotel-name">{hotel.name}</p>
            </div>

            <div style={{display:'flex',alignItem:'center',justifyContent:'space-between',width:'41%',padding:'4px 8px',alignItems:'center'}}>
            <label>Description: </label>
            <p className="hotel-description">{hotel.description}</p>
            </div>

            <div style={{display:'flex',alignItem:'center',justifyContent:'space-between',width:'41%',padding:'4px 8px',alignItems:'center'}}>
            <label>Price: </label>
            <p className="hotel-description">{hotel.price}</p>
            </div>
          
          <button className="book-button" onClick={() => togglePopup(hotel)}>Book Now</button>
          
          {isPopupOpen && (
        <div className="booking-popup">
          <div className="modal-overlay">
      <div className="booking-modal">
         {successMessage && <p className="success_message">We have sent your Request!!! Check your Mail If the Hotel Confirmed It</p>}
      {isBooked && <p className="success_message">Booking successful! We look forward to hosting you.</p>}
      <h2>Book Room at {selectedHotel.name}</h2>
        <label>Name:</label>
        <input type="text" name="name" value={bookingDetails.name} onChange={handleInputChange} required />
        <input type="hidden" name="hotelid" onChange={handleInputChange} />
        <label>Email:</label>
        <input type="email" name="email" value={bookingDetails.email} onChange={handleInputChange} required />
        <label>Price:</label>
        <input type="text" name="price" value={bookingDetails.price} onChange={handleInputChange} required disabled />
        <label>NumberOf_Rooms:</label>
        <input type="number" name="number_of_rooms" value={bookingDetails.number_of_rooms} onChange={handleInputChange} required />
        <label>CNIC:</label>
        <input type="text" name="cnic" value={bookingDetails.cnic} onChange={handleInputChange} required />
        <label>Country:</label>
        <input type="text" name="country" value={bookingDetails.country} onChange={handleInputChange} required />
        <label>Check-in Date:</label>
        <input type="date" name="checkInDate" value={bookingDetails.checkInDate} onChange={handleInputChange} required />
        <label>Check-out Date:</label>
        <input type="date" name="checkOutDate" value={bookingDetails.checkOutDate} onChange={handleInputChange} required />
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