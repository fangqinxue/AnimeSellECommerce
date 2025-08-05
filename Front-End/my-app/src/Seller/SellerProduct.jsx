import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellerProduct () {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const seller = JSON.parse(localStorage.getItem('seller'));
    console.log(seller)
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/product/getSellerProduct?sellerId=${seller.id}`);
          const updatedProducts = res.data.map(product => ({
            ...product,
            images: product.images.map(img => 
              img.startsWith('http') ? img : `http://localhost:3000${img}`
            )
          }))
          setProducts(updatedProducts);
          console.log(updatedProducts)
        } catch (error) {
          console.error('获取商品失败', error);
        }
      };
  
      fetchProducts();
    }, [seller._id]);
  
    const handleDelete = async (id) => {
      if (!window.confirm('确定要删除这个商品吗？')) return;
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        alert('删除失败');
      }
    };



    return(
        <div style={{ padding: '40px' }}>
            <div style={{display:'flex', gap:'50px'}}>        
        <h2>📦 My Product List</h2>
        <button
          onClick={() => navigate('/seller/dashboard/addProduct')}
          style={styles.addBtn}
        >
          ➕ Add Product
        </button></div>

  
        {products.length === 0 ? (
          <p>暂无商品。</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product._id} style={styles.card}>
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/250'}
                  alt={product.name}
                  style={styles.image}
                />
                <h3>{product.name}</h3>
                <p>Anime: {product.anime} / {product.character}</p>
                <p>Price: ¥{product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Rating: ⭐ {product.rating}</p>
                <p>Status: {product.available ? 'Sale' : 'Out of Stock'}</p>
                <div style={styles.buttonGroup}>
                  <button

                    onClick={() => {navigate(`/seller/dashboard/addProduct`, { state: product })}}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}

const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '24px',
      marginTop: '20px',
    },
    card: {
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '15px',
      background: '#fff',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginBottom: '10px'
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px'
    },
    editBtn: {
      background: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    deleteBtn: {
      background: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    addBtn: {
      margin: '20px 0',
      padding: '10px 20px',
      background: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }
  };


export default SellerProduct;