import React, { useState } from 'react';
import axios from 'axios';
import  "./signup.css";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../Components/naviBar/naviBar"




const signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const isValidEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const errs = {};

    // username
    if (!formData.username.trim()) {
      errs.username = '用户名不能为空';
    } else if (formData.username.length < 3) {
      errs.username = '用户名至少 3 个字符';
    } else if (formData.username.length > 20) {
      errs.username = '用户名不能超过 20 个字符';
    }

    // email
    if (!formData.email.trim()) {
      errs.email = '邮箱不能为空';
    } else if (!isValidEmail(formData.email)) {
      errs.email = '邮箱格式不正确';
    }

    // password
    if (!formData.password) {
      errs.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      errs.password = '密码至少 6 个字符';
    }

    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validate();
    setErrors(prev => ({ ...prev, [name]: '' }));
    
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // if (!formData.username || !formData.email || !formData.password) {
    //   setMessage('请填写所有字段');
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);

      setMessage('✅ 注册成功！');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('注册失败:', error.response || error);
      const errMsg = error.response?.data?.message || '❌ 注册失败，请稍后再试';
      setMessage(errMsg);
    }
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="signup">
      <h2 className="title">Sign up</h2>

      <form onSubmit={handleSubmit} className="Form">
        <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
         {<p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        {<p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        </div>

        <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
          {<p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>



        <button
          type="submit"
          className="button"
        >
          Sign up
        </button>

        <Link to="/login">Already has an account?</Link>
      </form>

      {message && <p className="mes">{message}</p>}
    </div>
    </>
  );
};

export default signup;
