import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function SellerLogin () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


      // 页面加载时检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('sellerToken');
    if (token) {
      navigate('/seller/dashboard', { replace: true });
    }
  }, [navigate]);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:3000/api/seller/login', { email, password });
        localStorage.setItem('sellerToken', res.data.token);
        localStorage.setItem('seller', JSON.stringify(res.data.seller));
        alert('登录成功');
        navigate('/seller/dashboard');
      } catch (err) {
        alert(err.response?.data?.message || '登录失败');
      }
    };
  
    return (
        <>
        <form onSubmit={handleLogin}>
        <h2>商家登录</h2>
        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">登录</button>
        </form>

        <button onClick={()=>{navigate("/sellerRegister")}}>新卖家</button>
        </>

      
    );
}


export default SellerLogin