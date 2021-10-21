import './Signin.css';
import SignInImage from '../../images/jelo.jpg';
import Button from '../Button/Button';
import {NavLink} from 'react-router-dom'

const FormSigIn=()=>{
   
    return(
        <div className='signin_slider'>
           <div className='sigin_slider_head'>
               <h2 className='sigin_slider_heading'>Working Sign In</h2>
           </div>
           <div className='signin_slider_main'>
               <div className='sigin_slider_main_img'>
                   <img className='signin_slider_image' src={SignInImage} />
  
           
               </div>
               <div className='sigin_slider_main_form'>
                   <form>
            <label>Name</label>
            <input placeholder='Enter your Name' />
            <label>Email</label>
            <input placeholder='Enter your Email' />
            <label>Password</label>
            <input type='password' placeholder='Enter your Password' />
            <label>ConfirmPassword</label>
            <input  type='password' placeholder='Confrm your Password' />
            <NavLink to='/dashboard'>
            <Button  name='Submit' list='signin_slider_button'/>
            </NavLink>
          
          <div className='slider_button_main'>
          <Button name='SignIn with Gmail' list='signin_slider_gmail_button'/>
         <Button name='SignIn with Facebook' list='signin_slider_gmail_button'/>
          </div>
          
          </form>
               </div>
           </div>
        </div>
    )
}

export default FormSigIn;