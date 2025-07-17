import React, { useEffect, useState } from 'react';
import NavBar from "../Components/naviBar/naviBar";
import Footer from '../Components/footer/footer';

function Checkout() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const buyNowItem = JSON.parse(localStorage.getItem('guest_cart')) || [];

    
    setItem(buyNowItem);


  }, []);

 

  if (!item || item.length === 0) return <p style={{ textAlign: 'center' }}>没有选择商品进行购买。</p>;
  const totalPrice = item.reduce((sum, product) => sum + product.price * product.quantity, 0);//循环遍历array方法

  return (
    <>
      <NavBar />

      
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>订单确认</h2>
        {/* <img src={item.image} alt={item.name} style={{ width: '200px' }} /> */}


        
            {item.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                <p>{product.name}</p>
                <p>数量：{product.quantity}</p>
                <p>单价：${product.price}</p>
                <p>总价：${(product.price * product.quantity).toFixed(2)}</p>
            </div>
            ))}
        
        <p style={{ fontWeight: 'bold' }}>订单总价：${totalPrice.toFixed(2)}</p>
        <button style={{ padding: '10px 20px', background: 'green', color: 'white' }}>确认支付</button>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;