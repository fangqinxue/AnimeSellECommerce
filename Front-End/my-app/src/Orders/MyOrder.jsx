import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`http://localhost:3000/api/order/myOrders?email=${user.email}`)
      .then(res => {
        setOrders(res.data.orders || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("获取订单失败:", err);
        setLoading(false);
      });
  }, []);

  if (!user) return <p>请先登录</p>;
  if (loading) return <p>加载中...</p>;

  return (
    <>
      <NavBar />

      <div style={{ padding: '20px' }}>
        <h2>🧾 我的订单</h2>

        {orders.length === 0 ? (
          <p>暂无订单。</p>
        ) : (
          orders.map(order => (
            <div key={order._id} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
              <h4>订单号：{order._id}</h4>
              <p>下单时间：{new Date(order.createdAt).toLocaleString()}</p>
              <p>总价：${order.total.toFixed(2)}</p>

              <h5>商品列表：</h5>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <img src={item.image} alt={item.name} width="60" style={{ verticalAlign: 'middle' }} />
                    <span style={{ marginLeft: '10px' }}>{item.name}</span>
                    <span> × {item.quantity}</span>
                    <span> - 单价 ${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;