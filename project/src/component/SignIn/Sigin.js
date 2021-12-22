import { useState } from 'react';
import SignInImage from '../../images/jelo.jpg';
import axios from 'axios';
import Button from '../Button/Button';
import {NavLink, useHistory} from 'react-router-dom'
import './Signin.css';

const FormSigIn=()=>{
    const history = useHistory();
    const  [userData, setUserData] = useState({
        email: '',
        password: '',
      
    })
    const submitHandler = async (event) => {
       event.preventDefault()
     const data =await  axios.post('http://localhost:4000/v1/user/login', userData)
     console.log(data)
     if(data.status===200){
       history.push("/dashboard")
     }
    };
    
    const changeHandler = (e) => {
       const {name,value}=e.target;
       setUserData({...userData,[name]:value})
       
    }
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
                   <form onSubmit={submitHandler}>
         
            <label>Email</label>
            <input placeholder='Enter your Email' name='email' onChange={changeHandler} />
            <label>Password</label>
            <input type='password' name='password' placeholder='Enter your Password' onChange={changeHandler}  />
            <Button  name='Login' list='signin_slider_button'/>
          
          
          </form>
               </div>
           </div>
        </div>
    )
}

export default FormSigIn;