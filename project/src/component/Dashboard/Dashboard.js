

import './Dashboard.css'
import Topbar from './Topbar/Topbar';
import SideBar from './SideBar/SideBar'
import  MapContainer  from '../GoogleMap/CurrentLocation';
import {useLocation} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'
import { useEffect,useState } from 'react';
const Dashboard=({ hotelInfo })=>{
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const encodedUserData= queryParams.get('userdata');
    const decodedUserData = JSON.parse(decodeURIComponent(encodedUserData));
    localStorage.setItem('userInfo', JSON.stringify(decodedUserData));
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log('userData',userData)

    useEffect(async() => {
        // Access the userData cookie and parse it
       await  axios.get('http://localhost:4000/v1/userdata')
      .then(response => {
        console.log('reee',response.data)
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
       
      }, []);

    return(
<div className='dashboard_slider'>
<Topbar  userData={userData} />
<div style={{display:'flex'}}>
<SideBar />
    <MapContainer hotelInfo={hotelInfo} /> 
</div>

</div>
    )
}


export default Dashboard;