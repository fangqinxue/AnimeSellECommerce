
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from "../Components/naviBar/naviBar"

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 实时字段校验
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value.trim()) return '邮箱不能为空';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '邮箱格式不正确';
    }
    if (name === 'password') {
      if (!value) return '密码不能为空';
      if (value.length < 6) return '密码至少 6 个字符';
    }
    return '';
  };

  const validateAll = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === '');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      setMessage('✅ 登录成功！');

      // 存储 token（例如 localStorage）
      localStorage.setItem('token', res.data.token);

      // 可重定向或刷新页面
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || '❌ 登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (


  <>
    <NavBar></NavBar>
    <div className="">

      <h2 className="text-2xl font-bold text-center">登录</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="邮箱"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="密码"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>

      {message && <p className="text-center text-sm text-blue-600">{message}</p>}
    </div>
    </>
  );
};




export default Login