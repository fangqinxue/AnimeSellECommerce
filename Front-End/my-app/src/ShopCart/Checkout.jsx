import React, { useEffect, useState } from 'react';
import NavBar from "../Components/naviBar/naviBar";
import Footer from '../Components/footer/footer';
import axios from 'axios';
function Checkout() {
  const [item, setItem] = useState([]);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedAddressId = localStorage.getItem('selectedAddressId');


  useEffect(() => {
    const buyNowItem = JSON.parse(localStorage.getItem('guest_cart')) || [];
    setItem(buyNowItem);


        // 获取地址详情
        const fetchAddress = async () => {
          if (!selectedAddressId) {
            alert('未选择收货地址，请返回购物车重新选择。');
            window.location.href = '/shopcart'; // 跳回购物车
            return;
          }
    
          try {
            const res = await axios.get(`http://localhost:3000/api/address/getAddressById`, {
              params: { id: selectedAddressId }
            });
            setAddress(res.data.address);
          } catch (err) {
            console.error("获取地址失败", err);
            alert("❌ 获取收货地址失败，请重试");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAddress();


  }, [selectedAddressId]);

  if (isLoading) return <p style={{ textAlign: 'center' }}>加载中...</p>;

  console.log(address)

  if (!item || item.length === 0) return <p style={{ textAlign: 'center' }}>没有选择商品进行购买。</p>;
  const totalPrice = item.reduce((sum, product) => sum + product.price * product.quantity, 0);//循环遍历array方法

  const user = JSON.parse(localStorage.getItem('user')) || [];
  const userEmail= user.email

  const handleCheckOut = async() => {
    const shouldPay = window.confirm("🛒 确认支付订单？");

    if (!shouldPay) {
      return; // 用户取消支付
    }

    try {
        const res = await axios.post('http://localhost:3000/api/order/createOrder', {
          shippingAddress:address,
          items: item,
          total: totalPrice,
          userEmail: userEmail,
          createdAt: new Date()
        });


  
        if (res.data.success) {
          alert('✅ 支付成功，订单已生成！');
          localStorage.removeItem('guest_cart');
          localStorage.removeItem('selectedAddressId');
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


                {/* 显示收货地址 */}
        {address ? (
          <div style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '20px',
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h4>📦 收货地址</h4>
            <p>{address.detail}</p>
            <p>收件人：{address.recipientName}</p>
            <p>联系电话：{address.phoneNumber}</p>
          </div>
        ) : (
          <p>⚠️ 未获取到地址信息</p>
        )}
        


        
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