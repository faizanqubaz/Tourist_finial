import './stripe.css'
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useHistory } from 'react-router-dom';

import axios from 'axios';

const SuccessPage = () => {
  const history = useHistory()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedBookingData = queryParams.get('bookingdata');
  const decodedBookingData = JSON.parse(decodeURIComponent(encodedBookingData));

  console.log('bookingData', decodedBookingData)
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {

    event.preventDefault();
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful');
        // Close the modal after submission
        setTimeout(async () => {
          setSuccessMessage(true);
          const updateRoomName = await axios.put(`http://localhost:4000/v1/rooms/update/${decodedBookingData.roomname}`, {
            guestId: decodedBookingData.bookingPersonId
          });

          const updateBookingPerson = await axios.put(`http://localhost:4000/v1/booking/update/${decodedBookingData.bookingPersonId}`, {
            payment: true
          });
          console.log('updatedRoom',updateRoomName)

          const hotelLocation = {
            latitude: decodedBookingData.hotelLatitude, // Replace with actual latitude
            longitude: decodedBookingData.hotelLongitude,
            name: decodedBookingData.hotelName,// Replace with actual longitude,
            roomname:decodedBookingData.roomname,
            checkInDate:decodedBookingData.checkInDate,
            checkOutDate:decodedBookingData.checkOutDate
          };
          console.log('hotelLocation', hotelLocation)
          localStorage.setItem('hotelInfo', JSON.stringify(hotelLocation));
          await axios.post('http://localhost:4000/v1/api/booked', {
            hotelEmail: decodedBookingData.hotelEmail,
            bookingDetails: decodedBookingData.email
          });
          history.push('/dashboard');
        }, 1000)

        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      }
    }
  };

  React.useEffect(() => {
    handleCreatePaymentIntent();
  }, []);


  const handleAmountChange = (event) => {
    // Handle changes in the payment amount
  };

  const handleCurrencyChange = (event) => {
    // Handle changes in the currency
  };

  const handleCreatePaymentIntent = async () => {
    const response = await axios.post('http://localhost:4000/api/create-payment-intent', {
      amount: decodedBookingData.price, // Amount in cents
      currency: 'usd', // Currency code
    });
    console.log('clientsecrettt', response.data.clientSecret)
    setClientSecret(response.data.clientSecret);
  };

  return (
    <div className='stripe_container'>
      <div className='stripe_header'>
        <h2 className='stripe_header_heading'>Go with stripe</h2>
        {successMessage && <p className="success_message">Sucessfully booked Your room</p>}
      </div>
      <form className='stripe_form' onSubmit={handleSubmit}>
        <input value={decodedBookingData.price} className='stripe_input' type="number" onChange={handleAmountChange} placeholder="Amount in cents" disabled />
        <input className='stripe_input' type="text" onChange={handleCurrencyChange} placeholder="Currency code" />
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '16px',
                fontFamily: '"Open Sans", sans-serif',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
        <button className='stripe_btn' type="submit" onClick={handleCreatePaymentIntent} disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  )
}

export default SuccessPage;