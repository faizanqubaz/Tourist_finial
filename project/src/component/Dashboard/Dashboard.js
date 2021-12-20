

import './Dashboard.css'
import Topbar from './Topbar/Topbar';
import SideBar from './SideBar/SideBar'
const Dashboard=()=>{


    return(
<div className='dashboard_slider'>
<Topbar />
<div style={{display:'flex'}}>
<SideBar />
<div style={{    width: '90%'}}>
    <h1 style={{    fontFamily: 'math',
    textAlign: 'center',
    marginTop: '62px',
}}>WelCome to Home</h1>
<p style={{    fontFamily: 'math',
    textAlign: 'center',
    marginTop: '62px',
}}>“One’s destination is never a place, but a new way of seeing things.” – Henry Miller</p>
</div>
</div>

</div>
    )
}


export default Dashboard;