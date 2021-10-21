import './Footer.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkSquareAlt} from '@fortawesome/free-solid-svg-icons';
import {faFacebook,faYoutube,faInstagram} from '@fortawesome/free-brands-svg-icons'
const Footer=()=>{
    return(
<>
<div className='footers_slider'>
     <div className='footer_main_head1'>
     <h3 className='footer_slider_heading'>Subscribe to learn about our latest
         <br /> news, updates and adventures.</h3>
     </div>
       <div className='footer_main_head2'>
           
    <i className='footer_main_icon'><FontAwesomeIcon  icon={faExternalLinkSquareAlt}  /></i>
       <input placeholder='Enter Your Email' className='footer_slider_input' />
       </div>

</div>

<div className='footer_large_slider'>
<div className='footer_large_slider_div'>
<h1>RIT</h1>
<h1>RIS</h1>
<h1>Experience</h1>
<h1>Our Company</h1>
<div className='ffffooooo'>
    <i className='footer_i_icon'><FontAwesomeIcon icon={faInstagram} /></i>
    <i className='footer_i_icon'><FontAwesomeIcon icon={faFacebook} /></i>
    <i className='footer_i_icon'><FontAwesomeIcon icon={faYoutube} /></i>
</div>
<p className='jj'>© 2021 Rivian. All Rights Reserved.</p>
</div>

<div className='footer_large_slider_div1'>
    <p>Purchasing</p>
    <p>Charging</p>
    <p>Membership</p>
    <p>Insurance</p>
    <p>Services</p>
</div>


<div>
<p>Stories</p>
    <p>Support</p>
    <p>Carries</p>
    <p>Newsrooms</p>  
</div>

</div>



</>
    )
}

export default Footer