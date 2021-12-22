import './signup.css';
import SignInImage from '../../images/jelo.jpg';
import Button from '../Button/Button';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';

const FormSigIn = () => {
    const history = useHistory()
    console.log(history)
 const  [userData, setUserData] = useState({
     name: '',
     lastName: '',
     email: '',
     password: '',
   
 })
 const submitHandler = async (event) => {
    event.preventDefault()
  const data =await  axios.post('http://localhost:4000/v1/user/register', userData)
  if(data.status===201){
    history.push("/signin")
  }
 };
 
 const changeHandler = (e) => {
    const {name,value}=e.target;
    setUserData({...userData,[name]:value})
    
 }
    return (
        <div className='signin_slider'>
            <div className='sigin_slider_head'>
                <h2 className='sigin_slider_heading'>Register Here</h2>
            </div>
            <div className='signin_slider_main'>
                <div className='sigin_slider_main_img'>
                    <img className='signin_slider_image' src={SignInImage} />


                </div>
                <div className='sigin_slider_main_form'>
                    <form onSubmit={submitHandler}>
                        <label>Name</label>
                        <input name='name' placeholder='Enter your Name' onChange={changeHandler} />

                        <label>LastNAme</label>
                        <input name='lastName' placeholder='Enter your LastName' onChange={changeHandler} />

                        <label>Email</label>
                        <input name='email' placeholder='Enter your Email' onChange={changeHandler}/>
                        <label>Password</label>
                        <input name='password' type='password' placeholder='Enter your Password' onChange={changeHandler}  />
                       
                            <Button name='Register' list='signin_slider_button' />




                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormSigIn;