import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SellerDashboard () {

    useEffect(() => {
        const token = localStorage.getItem('sellerToken');
        if (!token) {
          navigate('/seller/login', { replace: true });
        }
      }, []);

    const seller = JSON.parse(localStorage.getItem('seller'));
    console.log(seller);


    const styles = {
      container: {
        padding: '40px',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      },
      heading: {
        fontSize: '28px',
        marginBottom: '30px',
      },
      cardSection: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
      },
      card: {
        flex: 1,
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        background: '#f9f9f9',
      },
      statsSection: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
      },
      statCard: {
        flex: 1,
        background: '#e9f5ff',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        border: '1px solid #cce0ff'
      },
      links: {
        display: 'flex',
        gap: '15px'
      },
      linkButton: {
        padding: '12px 24px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
      }
    };

    const navigate= useNavigate()

    return(
      <>
          <div style={styles.container}>
            <h1 style={styles.heading}>Welcome Back , {seller.shopName} 👋</h1>

            <div style={styles.cardSection}>
              <div style={styles.card}>
                <h3>Seller ID</h3>
                <p>{seller.id}</p>
              </div>
              <div style={styles.card}>
                <h3>Email</h3>
                <p>{seller.userEmail}</p>
              </div>
              {/* 可扩展更多信息 */}
            </div>

            <div style={styles.statsSection}>
              <div style={styles.statCard}>
                <h4>Total Order</h4>
                <p>--</p>
              </div>
              <div style={styles.statCard}>
                <h4>Product Quantity</h4>
                <p>--</p>
              </div>
              <div style={styles.statCard}>
                <h4>Total income</h4>
                <p>--</p>
              </div>
            </div>

            <div style={styles.links}>
              <button style={styles.linkButton} onClick={() => navigate('/seller/products')}>管理商品</button>
              <button style={styles.linkButton} onClick={() => navigate('/seller/orders')}>查看订单</button>
            </div>
          </div>
      </>
    )
      
  }

export default SellerDashboard