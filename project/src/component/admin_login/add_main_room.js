import { useLocation,useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const AddMainRoom = () => {
  const history=useHistory()
  const location = useLocation();
  const hotel_details = location.state;
  const [numForms, setNumForms] = useState(1);
  const [formState, setFormState] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);


  const handleNumFormsChange = (e) => {
    setNumForms(parseInt(e.target.value));
    setFormState(new Array(parseInt(e.target.value)).fill({}));
  };

  const handleFieldChange = (e, formIndex, fieldName) => {
    const updatedFormState = formState.map((form, index) => {
      if (index === formIndex) {
        return { ...form, [fieldName]: e.target.value };
      }
      return form;
    });
    setFormState(updatedFormState);
  };

  const handleImageChange = (e, formIndex) => {
    const updatedFormState = [...formState];
    updatedFormState[formIndex].image = e.target.files[0];
    setFormState(updatedFormState);
  };

  const saveToDatabase = async () => {
    try {
      const formData = new FormData();

      // Append form data including images to formData
      formState.forEach((formItem, index) => {
        formData.append('image', formItem.image);
        formData.append('roomnumber', formItem.roomnumber);
        formData.append('roomsize', formItem.roomsize);
        formData.append('roomprice', formItem.roomprice);
        formData.append('attachbath', formItem.attachbath);
        formData.append('availability', formItem.availability)
     
        // ...append other form data properties
      });
      console.log('form', formState)
      const responseData = await axios.post(`http://localhost:4000/api/rooms/${hotel_details.id}`, formData); // Assuming /api/saveFormData/:hotelId is your API endpoint
      console.log('Form data saved successfully!',responseData);
      setSuccessMessage(true); // Set success message
      // Reset form fields
     
      setTimeout(() => {
          history.push('/adminmain');
          setSuccessMessage(false);
        }, 2000);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const renderForms = () => {
    return formState.map((form, index) => (
      <div className="hotel-card" key={index}>
        <div className="hotel-details">
          <div>
            <label htmlFor="roomnumber">Room Number:</label>
            <input
              type="text"
              id="roomnumber"
              name="roomnumber"
              value={form.roomnumber}
              onChange={(e) => handleFieldChange(e, index, 'roomnumber')}
              required
            />
          </div>
          <div>
            <label htmlFor="roomsize">Room Size:</label>
            <input
              type="text"
              id="roomsize"
              name="roomsize"
              onChange={(e) => handleFieldChange(e, index, 'roomsize')}
              value={form.roomsize}
              required
            />
          </div>

          <div>
            <label htmlFor="roomprice">Price:</label>
            <input
              type="text"
              id="roomprice"
              name="roomprice"
              onChange={(e) => handleFieldChange(e, index, 'roomprice')}
              value={form.roomprice}
              required
            />
          </div>

          <div>
            <label htmlFor="attachbath">BathRoom:</label>
            <input
              type="text"
              id="attachbath"
              name="attachbath"
              onChange={(e) => handleFieldChange(e, index, 'attachbath')}
              value={form.attachbath}
              required


            />
          </div>

          <div>
            <label htmlFor="availability">Availability:</label>
            <input
              type="text"
              id="availability"
              name="availability"
              onChange={(e) => handleFieldChange(e, index, 'availability')}
              value={form.availability}
              required

            />
          </div>

          <div>
            <label className="admin_portor_flex_1_label" htmlFor={`image`}>Image:</label>
            <input
              type="file"
              id='image'
              name="image"
              accept="image/*"
              className="admin_portor_flex_1_input"
              onChange={(e) => handleImageChange(e, index)}
              required
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className='addroom_container'>
        <div className='add_room_head'>
        {successMessage && <p className="success_message">Romm added</p>}
          <h2 className='add_room_heading'>ADD Rooms To {hotel_details.name} Hotel:</h2>
        </div>

        <div className='admin_addroom_inp_con'>
          <input
            className='add_room_input'
            type="number"
            id="numForms"
            value={numForms}
            onChange={handleNumFormsChange}
            required
          />
          {/* <button className='addroom_btn' onClick={handleAddRooms}>Add Rooms</button> */}
        </div>
      </div>
      <div className='main_add_room_container'>


        <div className="hotels-list">
          {renderForms()}
        </div>
        <div className='multi_class_main_room_btn_head'>
          <button className='multi_class_main_room_btn' onClick={saveToDatabase}>Save Rooms</button>
        </div>

      </div>

    </div>
  );
};

export default AddMainRoom;

