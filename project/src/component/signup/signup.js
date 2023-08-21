import './signup.css';
import SignInImage from '../../images/jelo.jpg';
import Button from '../Button/Button';
import { NavLink, useHistory } from 'react-router-dom';
import GoogleSignInButton from './GoogleSignInButton';
import axios from 'axios'
import { useState } from 'react';

const FormSigIn = () => {
    const handleGoogleSignInSuccess = (response) => {
        const token = response.tokenId;
    console.log('tokenn',token)
        // Send the token to your backend for verification
        fetch('http://localhost:4000/v1/google-signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify({ token }),
        })
          .then((res) => res.text())
          .then((data) => console.log(data))
          .catch((error) => console.error('Error:', error));
      };
    
      const handleGoogleSignInFailure = (error) => {
        console.log('Google Sign-In Failed:', error);
      };
      return (
        <div>
          <GoogleSignInButton  />
        </div>
    )
}

export default FormSigIn;