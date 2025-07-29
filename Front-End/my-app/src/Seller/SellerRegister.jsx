import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellerRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/seller/register', { email, password, name });
      alert('注册成功');
      navigate('/sellerLogin');
    } catch (err) {
      alert(err.response?.data?.message || '注册失败');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>商家注册</h2>
      <input type="text" placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="text" placeholder="店铺名" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">注册</button>
    </form>
  );
}

export default SellerRegister;