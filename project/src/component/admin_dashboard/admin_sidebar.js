// src/components/Sidebar.js
import React from 'react';
import './admin_sidebar.css';

const AdminSidebar = ({ onItemClick }) => {
  return (
    <div className="admin_sidebar">
      <div className="admin_sidebar_header">Admin</div>
      <hr className='hz_cls' />
      <div className="sidebar-item" onClick={() => onItemClick('home')}>
      <li className='add_hotel_lis'>Add Hotel</li>
      </div>
      <div className="sidebar-item" onClick={() => onItemClick('about')}>
        <li className='add_hotel_lis'>Add Destination</li>
      </div>
      <div className="sidebar-item" onClick={() => onItemClick('portor')} >
      <li className='add_hotel_lis'>Add Guide</li>
      </div>
    </div>
  );
};

export default  AdminSidebar;