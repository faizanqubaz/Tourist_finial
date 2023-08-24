// AddHotelForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 
import './add_hotel.css'; // Import your CSS file

const AddHotelForm = () => {
    const history = useHistory(); 
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email,setEmail]=useState('')
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [whatsappnumber,setWhatsappNumber]=useState('')
  
    const handleImageChange = (e) => {
     
      setImage(e.target.files[0]);
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('location', location);
      formData.append('price', price);
      formData.append('email', email);
      formData.append('whatsapp',whatsappnumber)
      try {
        const response = await axios.post('http://localhost:4000/api/hotels/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Hotel added:', response.data);
        setSuccessMessage('Hotel added successfully!'); // Set success message
      // Reset form fields
      setName('');
      setDescription('');
      setImage(null);
      // Redirect to home page after a delay
      setTimeout(() => {
  
       history.push('/addrooms', response.data);
      }, 2000);
      } catch (error) {
        console.error('Error adding hotel:', error);
      }
      // Your submission logic here
    };
  return (
    
    <div className="container">
    <div className="form-container">
      <h2 className="form-title">Add Hotel</h2>
      {successMessage && <p className="success_message">Hotel added</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Hotel Name:</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description:</label>
          <textarea
            id="description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          </div>

          <div className="form-group">
          <label className="form-label" htmlFor="email">Hotel Email:</label>
          <input
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>

          <div className="form-group">
          <label className="form-label" htmlFor="price">Average Price:</label>
          <input
            id="price"
            className="form-textarea"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          </div>
          <div className="form-group">
          <label className="form-label" htmlFor="location">Location:</label>
          <input
            id="location"
            className="form-textarea"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          </div>

          <div className="form-group">
          <label className="form-label" htmlFor="location">Contact-NO:</label>
          <input
            id="whatsapp"
            className="form-textarea"
            value={whatsappnumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
          />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="image">Hotel Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="form-button">Add Hotel</button>
        </form>
      </div>
    </div>
  );
};

export default AddHotelForm;