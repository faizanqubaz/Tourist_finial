import React from 'react';

const DistanceButton = ({ onClick }) => (
  <button style={{position:'absolute',cursor:'pointer',left:'600px',top:'60px',padding:'8px 20px'}} 
    onClick={onClick}>Calculate Distance</button>
);

export default DistanceButton;