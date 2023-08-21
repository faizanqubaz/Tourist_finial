import React from 'react';
import * as queryString from 'query-string';
import axios from 'axios';
import './googlesigin.css'

const GoogleLoginComponent = () => {
  const stringifiedParams = queryString.stringify({
    client_id: '157698735716-v65d39mm2m0mjgakscpd707g8lm21cpv.apps.googleusercontent.com', // Set your client ID
    redirect_uri: 'http://localhost:4000/v1/callback', // Your redirect URI
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  return (
    <a href={googleLoginUrl} className="google-signin-button">
      Google Sigin
    </a>
  );
};

export default GoogleLoginComponent;
