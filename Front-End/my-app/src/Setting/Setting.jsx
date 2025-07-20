import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();

    const settings = [
      {
        title: '👤 账户信息',
        description: '修改用户名、邮箱、密码、头像',
        onClick: () => navigate('/profileSetting')
      },
      {
        title: '📍 地址管理',
        description: '添加、删除、修改送货地址',
        onClick: () => navigate('/addressSetting')
      },
      {
        title: '📦 我的订单',
        description: '查看历史订单与订单状态',
        onClick: () => navigate('/orders')
      }
    ];
  
    return (
      <>
        <NavBar />
  
        <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px' }}>⚙️ 设置中心</h2>
  
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