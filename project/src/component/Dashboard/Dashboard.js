

import './Dashboard.css'
import Topbar from './Topbar/Topbar';
import SideBar from './SideBar/SideBar'
import  MapContainer  from '../GoogleMap/CurrentLocation';
const Dashboard=({ hotelInfo })=>{


    return(
<div className='dashboard_slider'>
<Topbar />
<div style={{display:'flex'}}>
<SideBar />
    <MapContainer hotelInfo={hotelInfo} /> 
</div>

</div>
    )
}


export default Dashboard;