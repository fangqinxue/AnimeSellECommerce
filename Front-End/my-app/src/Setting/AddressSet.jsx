import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';
import { useNavigate } from 'react-router-dom';

function AddressManagement() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [addresses, setAddresses] = useState([]);


    const username = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    // 获取地址列表
    const fetchAddresses = async () => {
        try {
          const email = username.email // 你也可以从 localStorage 或 state 中获取
          const res = await axios.get(`http://localhost:3000/api/address/getUserAddresses`, {
            params: { email }
          });
      
          setAddresses(res.data.addresses);
        } catch (err) {
          console.error('获取地址失败:', err);
        }
      };
  
    useEffect(() => {
      fetchAddresses();
    }, []);
  

   
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure to delete this address?')) {
        await axios.delete(`http://localhost:3000/api/address/deleteAddress/${id}`);
        fetchAddresses();
      }
    };
  

  
    const setAsDefault = async (id) => {
        try {
          await axios.put(`http://localhost:3000/api/address/setDefault/${id}`, {
            email: user.email
          });
          fetchAddresses();
        } catch (err) {
          console.error("设置默认地址失败:", err);
        }
      };

    return (
    //   <>
    //     <NavBar />
    //     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    //       <h2>收货地址管理</h2>
  
    //       {/* 地址列表 */}
    //       {addresses.map((addr) => (
    //         <div key={addr._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
    //           <p><strong>{addr.recipientName}</strong> - {addr.phoneNumber}</p>
    //           <p>{addr.province} {addr.city} {addr.district} {addr.detail}</p>
    //           <p>{addr.postalCode}</p>
    //           <p style={{ color: 'green' }}>{addr.isDefault ? '【默认地址】' : ''}</p>
    //           <button onClick={() => navigate("/addressEdit", { state: addr })} style={styles.button}>编辑</button>
    //           <button onClick={() => handleDelete(addr._id)} style={styles.danger}>删除</button>
    //           {!addr.isDefault && <button onClick={() => setAsDefault(addr._id)} style={styles.secondary}>设为默认</button>}
    //         </div>
    //       ))}

    //       <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', height: "200px",
    //        display:'flex', alignItems:"center", justifyContent:"center", cursor:'pointer'}}>
    //           <p onClick={() => navigate("/addressEdit")} style={{ fontSize: "50px" }}>+</p>
    //       </div>
  
         

    //     </div>
    //     <Footer />
    //   </>


    <>
  <NavBar />
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h2 style={{color:'orange',fontSize:'30px'}}>Address Management</h2>

    {/* 地址列表 */}
    {addresses.map((addr) => (
      <div
        key={addr._id}
        style={{
          border: '1px solid #ccc',
          borderRadius:'10px',
          padding: '10px',
          margin: '10px 0',
          backgroundColor: addr.isDefault ? '#e6ffe6' : 'white', // ✅ 高亮默认地址
          position: 'relative',
        }}
      >
        {addr.isDefault && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px',
            }}
          >
            ⭐ Default
          </span>
        )}
        <div style={{margin:'20px 30px'}}>
          <p><strong>{addr.recipientName}</strong> - {addr.phoneNumber}</p>
          <p>{addr.province} {addr.city} {addr.district} {addr.detail}</p>
          <p>{addr.postalCode}</p>

        </div>


        <div style={{ marginTop: '10px' }}>
          <button onClick={() => navigate("/addressEdit", { state: addr })} style={styles.button}>Edit</button>
          <button onClick={() => handleDelete(addr._id)} style={styles.danger}>Delete</button>
          {!addr.isDefault && (
            <button onClick={() => setAsDefault(addr._id)} style={styles.secondary}>Set as Default</button>
          )}
        </div>
      </div>
    ))}

    {/* 添加新地址卡片 */}
    <div
      onClick={() => navigate("/addressEdit")}
      style={{
        border: '1px dashed #aaa',
        padding: '10px',
        margin: '10px 0',
        height: "200px",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        cursor: 'pointer',
        fontSize: "50px",
        color: '#888',
        transition: '0.3s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
    >
      +
    </div>
  </div>
  <Footer />
</>
    );
  }
  
  const styles = {
    input: {
      display: 'block',
      width: '100%',
      padding: '8px',
      margin: '8px 0'
    },
    button: {
      width:'200px',
      padding: '8px 16px',
      marginRight: '10px',
      background: '#E17912',
      color: 'white',
      border: 'none',
      cursor: 'pointer'
    },
    danger: {
      width:'200px',
      padding: '8px 16px',
      background: 'red',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginRight: '10px'
    },
    secondary: {
      width:'300px',
      padding: '8px 16px',
      background: 'gray',
      color: 'white',
      border: 'none',
      cursor: 'pointer'
    }
  };
  
  export default AddressManagement;