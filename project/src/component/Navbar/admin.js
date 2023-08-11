import React,{useState} from 'react'
import {Link,NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons'
import {useDispatch,useSelector} from 'react-redux'
import {loginRequested} from '../../state/actions/loginAction';
import { Redirect } from 'react-router-dom';
import './admin.css'
const Admin =(props)=>{
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);

    const handleButtonClick = () => {
      setRedirectToSignIn(true);
    };
    if (redirectToSignIn) {
        return <Redirect to="/adminsigin" />;
      }
    
    return (
        <button className="admin-button" onClick={handleButtonClick}>
          {props.name}
        </button>
      );
}

export default Admin;