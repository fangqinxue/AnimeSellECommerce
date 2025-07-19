import React, { useEffect, useState } from 'react';
import NavBar from "../Components/naviBar/naviBar";
import Footer from '../Components/footer/footer';
import axios from 'axios';
function Checkout() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const buyNowItem = JSON.parse(localStorage.getItem('guest_cart')) || [];
    
    
    setItem(buyNowItem);


  }, []);

 

  if (!item || item.length === 0) return <p style={{ textAlign: 'center' }}>没有选择商品进行购买。</p>;
  const totalPrice = item.reduce((sum, product) => sum + product.price * product.quantity, 0);//循环遍历array方法

  const user = JSON.parse(localStorage.getItem('user')) || [];
  const userEmail= user.email
  console.log(item)
  const handleCheckOut = async() => {
    const shouldPay = window.confirm("🛒 确认支付订单？");

    if (!shouldPay) {
      return; // 用户取消支付
    }

    try {
        const res = await axios.post('http://localhost:3000/api/order/createOrder', {
          items: item,
          total: totalPrice,
          userEmail: userEmail,
          createdAt: new Date()
        });


  
        if (res.data.success) {
          alert('✅ 支付成功，订单已生成！');
          localStorage.removeItem('guest_cart');
          window.location.href = "/";
        } else {
          alert('❌ 支付失败：' + res.data.message);
        }
      } catch (err) {
        console.error("提交订单失败", err);
        alert("❌ 网络错误或服务器异常");
      }

  }

  

  return (
    <>
      <NavBar />

      
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>订单确认</h2>
        


        
            {item.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                <p>{product.name}</p>
                <p>数量：{product.quantity}</p>
                <p>单价：${product.price}</p>
                <p>总价：${(product.price * product.quantity).toFixed(2)}</p>
            </div>
            ))}
        
        <p style={{ fontWeight: 'bold' }}>订单总价：${totalPrice.toFixed(2)}</p>
        <button style={{ padding: '10px 20px', background: 'green', color: 'white' }} onClick={handleCheckOut}>确认支付</button>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;