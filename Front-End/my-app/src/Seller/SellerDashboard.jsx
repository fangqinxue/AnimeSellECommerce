import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SellerDashboard () {

    useEffect(() => {
        const token = localStorage.getItem('sellerToken');
        if (!token) {
          navigate('/seller/login', { replace: true });
        }
      }, []);

    const seller = JSON.parse(localStorage.getItem('seller'));
    console.log(seller.id);
  
    const [formData, setFormData] = useState({
      name: '',
      anime: '',
      character: '',
      price: '',
      stock: '',
      rating: '',
      tags: '',
      release_date: '',
      images: '',
      description: '',
      height_cm: '',
      width_cm: '',
      depth_cm: '',
      manufacturer: '',
      available: true,
    });
  
    const [message, setMessage] = useState('');
  
    const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        images: formData.images.split(',').map(img => img.trim()).filter(Boolean),
        release_date: formData.release_date ? new Date(formData.release_date) : undefined,
        dimensions: {
          height_cm: Number(formData.height_cm),
          width_cm: Number(formData.width_cm),
          depth_cm: Number(formData.depth_cm),
        },
        seller: seller.id,  // 记得把sellerId也传给后台
      };
  
      const token = localStorage.getItem('sellerToken');
      if (!token) {
        setMessage('请先登录');
        return;
      }
  
      try {
        const res = await axios.post('http://localhost:3000/api/auth/addProduct', payload);
  
        setMessage('商品添加成功');
        setFormData({
          name: '',
          anime: '',
          character: '',
          price: '',
          stock: '',
          rating: '',
          tags: '',
          release_date: '',
          images: '',
          description: '',
          height_cm: '',
          width_cm: '',
          depth_cm: '',
          manufacturer: '',
          available: true,
        });
      } catch (error) {
        setMessage(error.response?.data?.message || error.message || '添加失败');
      }
    };
    
      return (
        <div>
          <h2>添加商品</h2>
          <form onSubmit={handleSubmit}>
    
            <input
              name="name"
              placeholder="名称"
              value={formData.name}
              onChange={handleChange}
              required
            />
    
            <input
              name="anime"
              placeholder="动漫名"
              value={formData.anime}
              onChange={handleChange}
              required
            />
    
            <input
              name="character"
              placeholder="角色名"
              value={formData.character}
              onChange={handleChange}
              required
            />
    
            <input
              name="price"
              type="number"
              placeholder="价格"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
    
            <input
              name="stock"
              type="number"
              placeholder="库存"
              value={formData.stock}
              onChange={handleChange}
              min="0"
            />
    
            <input
              name="rating"
              type="number"
              placeholder="评分"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
    
            <input
              name="tags"
              placeholder="标签（逗号分隔）"
              value={formData.tags}
              onChange={handleChange}
            />
    
            <input
              name="release_date"
              type="date"
              placeholder="发布日期"
              value={formData.release_date}
              onChange={handleChange}
            />
    
            <input
              name="images"
              placeholder="图片链接（逗号分隔）"
              value={formData.images}
              onChange={handleChange}
            />
    
            <textarea
              name="description"
              placeholder="描述"
              value={formData.description}
              onChange={handleChange}
            />
    
            <input
              name="height_cm"
              type="number"
              placeholder="高度 (cm)"
              value={formData.height_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="width_cm"
              type="number"
              placeholder="宽度 (cm)"
              value={formData.width_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="depth_cm"
              type="number"
              placeholder="深度 (cm)"
              value={formData.depth_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="manufacturer"
              placeholder="制造商"
              value={formData.manufacturer}
              onChange={handleChange}
            />
    
            <label>
              <input
                name="available"
                type="checkbox"
                checked={formData.available}
                onChange={handleChange}
              /> 上架
            </label>
    
            <button type="submit">提交</button>
          </form>
    
          {message && <p>{message}</p>}
        </div>
      );
}

export default SellerDashboard