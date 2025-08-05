import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';

function ProfilePage() {


  // 假设你有 userEmail 存在 localStorage
  const userDetail = JSON.parse(localStorage.getItem('user')); 






  if (!userDetail) return <p>loading...</p>;

  return (
    <>
      <NavBar />



      <div style={{
        margin: '40px auto',
        maxWidth: '600px',
        padding: '30px',
        border: '1px solid #eee',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={userDetail.avatar || 'https://i.pravatar.cc'}//这个网站可以返回随机的头像，非常适合开发
            alt="avatar"
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{userDetail.username}</h2>
            <p style={{ color: '#555' }}>{userDetail.email}</p>
          </div>
        </div>

        <hr />

        <div style={{ marginTop: '20px' }}>
          <h3>Account Information</h3>
          <p><strong style={{marginRight:'10px'}}>User Name:</strong>{userDetail.username}</p>
          <p><strong style={{marginRight:'10px'}}>Email Address:</strong>{userDetail.email}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;