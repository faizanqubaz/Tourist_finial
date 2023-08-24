import React from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios'
import '../hotels/nearby.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const PotorPage=()=> {
  const location = useLocation();
  const receivedData = location.state;
console.log('rese',receivedData)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div>
    
    <div className="hotels-list">
    {
  receivedData.length == 0 ? (
    <p className='potors_h2'>No Guide Available for this Destination</p>
  ) : (
    receivedData.map((hotel, index) => (
      <div className="hotel-card" key={index}>
        <img className="hotel-image" src={`http://localhost:4000${hotel.imageUrl}`} alt={hotel.name} width="300" />
        <div className="hotel-details">
          <h2 className="hotel-name">{hotel.name}</h2>
          <p className="hotel-location">{hotel.phoneNumber}</p>
          <p className="hotel-description">{hotel.description}</p>
          <p className="hotel-price">{hotel.price}</p>
          
       <button
  className="whatsapp-button"
  onClick={() => {
    const countryCode = '92';
    const phoneNumber = hotel.phoneNumber;
    const whatsappUrl = `https://wa.me/${countryCode}${phoneNumber}`;
    
    window.open(whatsappUrl, '_blank');
  }}
>
  Contact via WhatsApp
</button>
        </div>
      </div>
    ))
  )
    
    }
  </div>
  </div>
  );
}

export default PotorPage;