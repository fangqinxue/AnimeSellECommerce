
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function SellerAddProduct () {
  const { state } = useLocation();
  console.log(state)
  const isEdit = Boolean(state);
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
        setMessage('please log in at first');
        return;
      }
  
      try {
        const res = await axios.post('http://localhost:3000/api/auth/addProduct', payload);
  
        setMessage('Add Product Successfully');
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
        setMessage(error.response?.data?.message || error.message || 'fail to add');
      }
    };
    
      return (
        <div>
         <h2>{isEdit ?  'Edit' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit}>
    
            <input
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
    
            <input
              name="anime"
              placeholder="Anime Name"
              value={formData.anime}
              onChange={handleChange}
              required
            />
    
            <input
              name="character"
              placeholder="character Name"
              value={formData.character}
              onChange={handleChange}
              required
            />
    
            <input
              name="price"
              type="number"
              placeholder="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
    
            <input
              name="stock"
              type="number"
              placeholder="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
            />
    
            <input
              name="rating"
              type="number"
              placeholder="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
    
            <input
              name="tags"
              placeholder="tags（逗号分隔）"
              value={formData.tags}
              onChange={handleChange}
            />
    
            <input
              name="release_date"
              type="date"
              placeholder="release date"
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
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
            />
    
            <input
              name="height_cm"
              type="number"
              placeholder="height (cm)"
              value={formData.height_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="width_cm"
              type="number"
              placeholder="width (cm)"
              value={formData.width_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="depth_cm"
              type="number"
              placeholder="depth (cm)"
              value={formData.depth_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="manufacturer"
              placeholder="manufacture"
              value={formData.manufacturer}
              onChange={handleChange}
            />
    
            <label style={{display:'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '16px',
                          color: '#333',
                          cursor: 'pointer',
                          userSelect: 'none'
            }}>
              <input
                name="available"
                type="checkbox"
                checked={formData.available}
                onChange={handleChange}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'coral',  
                  cursor: 'pointer',
                }}
              /> on stock
            </label>
    
            <button type="submit">{isEdit ? 'Save Change' : 'Submit'}</button>
          </form>
    
          {message && <p>{message}</p>}


                    <button
                    onClick={() => {
                      localStorage.removeItem('seller');
                      localStorage.removeItem('sellerToken');
                      window.location.href = '/sellerLogin'; // 或者使用 navigate('/seller/login')
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#E17912',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                    >
                    log out
                    </button>
        </div>
      );


}

export default SellerAddProduct