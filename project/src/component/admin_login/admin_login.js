
import React, { useState } from 'react';
import './admin_login.css'; // Import your CSS file
import {NavLink, useHistory} from 'react-router-dom'

const AdminLoginPage = () => {
    const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault(); 
   
    if (username === 'faizan' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  if (loggedIn) {
    // Replace with your admin dashboard or redirection logic

    history.push("/adminmain")
  }

  return (
    <div className="admin-login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <div className="input-container">
          <label className='admin_label' htmlFor="username">Username</label>
          <input
          className='admin_login_input'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div  className="input-container">
          <label className='admin_label' htmlFor="password">Password</label>
          <input
          className='admin_login_input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='admin_login_btns' type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;