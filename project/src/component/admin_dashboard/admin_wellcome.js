// src/components/WelcomeMessage.js
import React from 'react';
import './admin_wellcome.css';

const WelcomeMessage = ({ adminName, onLogout }) => {
  return (
    <div className="admin_welcome-container">
      <div className="admin_welcome-box">
        <h2 className="welcome-title">Welcome, {adminName}!</h2>
        <p className="welcome-message">You are logged in as an admin.</p>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;