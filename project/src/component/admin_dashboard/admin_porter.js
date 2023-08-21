import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './admin_portor.css'
const AdminPortor = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const [dob, setDOB] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phonenumber', phoneNumber);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('selectedoption', selectedOption);
        formData.append('dob', dob);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:4000/api/portor/', formData);
            console.log('Destination added:', response.data);
            setSuccessMessage(true); // Set success message
            // Reset form fields
            setName('');
            setAddress('');
            setCity('')
            setDescription('')
            setPhoneNumber('')
            setPrice('')
            setImage(null);
            setTimeout(() => {
                history.push('/adminmain');
                setSuccessMessage(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding destination:', error);
        }
    }

    return (
        <div className="admin_portor_container">
            <div className="admin_portor_head">
                <h2 className="admin_portor_heading">Add Tour Guide:</h2>
            </div>
            {successMessage && <p className="success_message">Guide added</p>}


            <form onSubmit={handleSubmit}>
                <div className="admin_portor_flex_1">

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="firstname">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="admin_portor_flex_1_input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="lastname">PhoneNumber:</label>
                        <input
                            type="text"
                            id="phonenumber"
                            className="admin_portor_flex_1_input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            className="admin_portor_flex_1_input"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>



                <div className="admin_portor_flex_1">

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            className="admin_portor_flex_1_input"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="dob">DOB:</label>
                        <input
                            className="admin_portor_flex_1_conatiner_date_input"
                            type="date"
                            placeholder="MM"
                            maxLength="2"
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                            required
                        />

                    </div>

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="reviews">Select NearBy Destination:</label>
                        <div className="dropdown-container">
                            <select
                                className="dropdown-input"
                                value={selectedOption}
                                onChange={handleDropdownChange}
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                <option value="Batura Glacier Trek">Batura Glacier Trek</option>
                                <option value="Borith Trek">Borith Trek</option>
                                <option value="Zarobod Trek">Zarobod Trek</option>
                                <option value="Karagah Nalah Trek">Karagah Nalah Trek</option>
                                <option value="Khunjerab Trek">Khunjerab Trek</option>
                                <option value="Ulter Trek">Ulter Trek</option>
                                <option value="Shimshal Trek">Shimshal Trek</option>
                                <option value="Astore Trek">SAstore Trek</option>
                            </select>
                        </div>
                    </div>
                </div>


                <div className="admin_portor_flex_1">

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="description">Description:</label>
                        <input
                            type="text"
                            id="description"
                            className="admin_portor_flex_1_input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="firstname">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            className="admin_portor_flex_1_input"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <div className="admin_portor_flex_1_conatiner">
                        <label className="admin_portor_flex_1_label" htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="description"
                            className="admin_portor_flex_1_input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                    </div>
                </div>

                <div className="admin_portor_flex_1_conatiner_btn">
                    <button type="submit" className="admin_portor_flex_1_conatiner_button">Please Submit</button>
                </div>
            </form>


        </div>
    );
}
export default AdminPortor;