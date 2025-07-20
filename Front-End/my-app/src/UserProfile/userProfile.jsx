import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // 假设你有 userEmail 存在 localStorage
  const userDetail = JSON.parse(localStorage.getItem('user')); 






  if (!userDetail) return <p>加载中...</p>;

  return (
    <>
      <NavBar />



      <div style={{ padding: '20px' }}>
        <h2>个人信息</h2>
        <h2>{userDetail.username}</h2>
        <h2>{userDetail.email}</h2>

      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;