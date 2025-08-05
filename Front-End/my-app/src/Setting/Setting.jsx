import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();

    const settings = [
      {
        title: '👤 Account Detail',
        description: 'Change user name, password',
        onClick: () => navigate('/profileSetting')
      },
      {
        title: '📍 Address Management',
        description: 'Add, Delete, Modify Address',
        onClick: () => navigate('/addressSetting')
      },
      {
        title: '📦 My Order',
        description: 'Order History and status',
        onClick: () => navigate('/orders')
      }
    ];
  
    return (
      <>
        <NavBar />
  
        <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px' }}>⚙️ Setting</h2>
  
          {settings.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px 20px',
                marginBottom: '15px',
                cursor: 'pointer',
                background: '#f9f9f9',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f1f1f1'}
              onMouseLeave={e => e.currentTarget.style.background = '#f9f9f9'}
            >
              <h3 style={{ margin: 0 }}>{item.title}</h3>
              <p style={{ color: '#555' }}>{item.description}</p>
            </div>
          ))}
        </div>
  
        <Footer />
      </>
    );

}

export default Settings;