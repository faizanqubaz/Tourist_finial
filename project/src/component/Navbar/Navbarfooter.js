import React,{useState} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons'
import {useDispatch,useSelector} from 'react-redux'
import {loginRequested} from '../../state/actions/loginAction';
import FormSigIn from '../signup/signup';

const NavbarFooter =(props)=>{
    const [displaypopup,setpopup]=useState(true);
    const dispatch=useDispatch();
    const loginInfo=useSelector((state)=>state.login);
    const displaythePopup=()=>{
        setpopup(!displaypopup);
    }
    return(
       <div className='footer_navbar'>
        <FormSigIn />
           {/* {JSON.stringify(loginInfo)} */}
           {/* <NavLink to='signup'>
           <h2 onClick={()=>dispatch(loginRequested({
               email:"eve.holt@reqres.in",
               password:"cityslicka"
           }))} className='footer_slider'>{props.name}</h2>
           </NavLink> */}
           
           <i onClick={displaythePopup} className='footer_slider_icon'><FontAwesomeIcon icon={faAlignJustify} /></i>
           <div className={displaypopup? 'popup' : 'popups'}>
  <ul className='footer_navbar_ul'>
    <li>Home</li>
    <hr />
    <li>Contact Us</li>
    <hr />
    <li>Map</li>
    <hr />
    <li>About Us</li>
    <hr />
    <li>About Us</li>
    <hr />
    <li>About Us</li>
    <hr />
  </ul>
 </div>
       </div>
    )
}

export default NavbarFooter;