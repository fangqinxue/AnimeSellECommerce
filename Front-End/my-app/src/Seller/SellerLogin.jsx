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
        <form style={{ display:'flex', flexDirection:"column", alignItems:'center', width:'500px', border:'1px solid black', margin:'20px auto',marginTop:'60px', borderRadius:'10px'}} onSubmit={handleLogin}>
        <h2 > Seller Log In</h2>
        <input  style={{margin:'20px 0', width:'400px'}} type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{margin:'20px 0', width:'400px'}}  type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={{margin:'20px 0', width:'200px'}}  type="submit" >Log In</button>
        </form>
        <div style={{textAlign:'center'}}>
        <button style={{width:'300px'}} onClick={()=>{navigate("/sellerRegister")}}>New Seller</button>
        </div>

        </>

      
    );
}


export default SellerLogin