import React, { useState } from 'react';
import './admin_destination_form.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const AdminDestinationPage = () => {
    const history = useHistory(); 
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState(null);
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('location', location);
        formData.append('rating', rating);
        formData.append('description', description);
        formData.append('image', image);
        try {
            const response = await axios.post('http://localhost:4000/api/destinations/', formData);
            console.log('Destination added:', response.data);
            setSuccessMessage('Destination added successfully!'); // Set success message
            // Reset form fields
            setName('');
            setDescription('');
            setAddress('')
            setRating('')
            setImage(null);
            setTimeout(() => {
                history.push('/adminmain');
              }, 2000);
          } catch (error) {
            console.error('Error adding destination:', error);
          }
        };
        return (
            <div className="admin-destination-container">
              <div className="admin-destination-form">
                <h2>Add Destination</h2>
                {successMessage && <p className="success_message">Hotel added</p>}
                <form onSubmit={handleSubmit}>
                  <div className="admin_form_group">
                    <label className="admin_form_label" htmlFor="name">Destination Name:</label>
                    <input
                      type="text"
                      id="name"
                      className="admin_form_input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin_form_group">
                    <label className="admin_form_label" htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      className="admin_form_input"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin_form_group">
                    <label className="admin_form_label" htmlFor="name">Location</label>
                    <input
                      type="text"
                      id="location"
                      className="admin_form_input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin_form_group">
                    <label className="admin_form_label" htmlFor="rating">Rating</label>
                    <input
                      type="text"
                      id="rating"
                      className="admin_form_input"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      className="admin_form_textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
            <label className="form-label" htmlFor="image">Destination Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="form-button">Add Destination</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDestinationPage;    