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
      alert('Register Successfully');
      navigate('/sellerLogin');
    } catch (err) {
      alert(err.response?.data?.message || 'fail to register');
    }
  };

  return (
    <form style={{ display:'flex', flexDirection:"column", alignItems:'center', width:'500px', border:'1px solid black', margin:'20px auto',marginTop:'60px', borderRadius:'10px'}} onSubmit={handleRegister}>
      <h2>Seller Register</h2>
      <input  style={{margin:'20px 0', width:'400px'}}  type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input  style={{margin:'20px 0', width:'400px'}} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input   style={{margin:'20px 0', width:'400px'}} type="text" placeholder="store name" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}

export default SellerRegister;