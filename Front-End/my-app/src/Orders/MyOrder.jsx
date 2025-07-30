import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/naviBar/naviBar';
import Footer from '../Components/footer/footer';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null)
  const [filterStatus, setFilterStatus] = useState('待发货');

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




  // 展平每个 item，并附加订单信息
  const allItems = orders.flatMap(order =>
    order.items.map(item => ({
      ...item,
      orderId: order._id,
      orderTime: order.createdAt,
      orderTotal: order.total,
      fullOrder: order
    }))
  );


  const statuses = ['全部', '待发货', '运输中', '已签收', '退货中', '已退货'];

  const filteredItems = filterStatus === '全部'
  ? allItems
  : allItems.filter(item => item.logisticsStatus === filterStatus);

    const statusCounts = {
      '全部': allItems.length,
      '待发货': allItems.filter(i => i.logisticsStatus === '待发货').length,
      '运输中': allItems.filter(i => i.logisticsStatus === '运输中').length,
      '已签收': allItems.filter(i => i.logisticsStatus === '已签收').length,
      '退货中': allItems.filter(i => i.logisticsStatus === '退货中').length,
      '已退货': allItems.filter(i => i.logisticsStatus === '已退货').length
    };

  return (
    <>
      <NavBar />

      <div style={{ padding: '20px' }}>


        <h2>🧾 我的订单</h2>

                {/* 状态筛选按钮 */}
          <div style={{ marginBottom: '20px', display:'flex', justifyContent:"space-between"}}>
          {statuses.map(status => (
            <div key={status}>
              
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  position:'relative',
                  minWidth:"150px",
                  marginRight: '10px',
                  padding: '8px 16px',
                  backgroundColor: filterStatus === status ? 'black' : '#f0f0f0',
                  color: filterStatus === status ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >


                 {filterStatus === status && <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'orange',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '2px 7px',
                    fontSize: '12px',
                    lineHeight: '1',

                    }}>
                    {statusCounts[status]}
                  </div>}

                {status}
              </button>

            </div>

          ))}
        </div>





{filteredItems.length === 0 ? (
          <p>没有符合条件的订单商品。</p>
        ) : (
  filteredItems.map((item, idx) => (
    <div key={idx} style={{
      border: '1px solid #ccc',
      marginBottom: '20px',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h4>🧾 订单号：{item.orderId}</h4>
      <p>🕒 下单时间：{new Date(item.orderTime).toLocaleString()}</p>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <img src={item.image} alt={item.name} width="100" height="100" style={{ objectFit: 'cover', borderRadius: '8px' }} />
        <div style={{ marginLeft: '20px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1em' }}>{item.name}</p>
          <p style={{ margin: 0 }}>数量：{item.quantity}</p>
          <p style={{ margin: 0 }}>单价：${item.price.toFixed(2)}</p>
        </div>
      </div>

      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>💰 总价：${(item.quantity*item.price).toFixed(2)}</p>
      <p style={{ marginTop: '5px' }}>🚚 物流状态：{item.logisticsStatus}</p>

      <div style={{display:"inline-block"}} >
        <button onClick= {()=> {
          setSelectedOrder(item.fullOrder);   // 👈 保存当前订单
          setSelectedItem(item)
          console.log(item)
          setShowOrderModal(true)
        }}>查看详情</button>
        <button>退款</button>  
                                             
      </div>
    </div>
)))}











{/* 
        {orders.length === 0 ? (
          <p>暂无订单。</p>
        ) : (
          orders.map(order => (
            <div key={order._id} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
              <h4>订单号：{order._id}</h4>
              <p>下单时间：{new Date(order.createdAt).toLocaleString()}</p>
              <p>总价：${order.total.toFixed(2)}</p>

              <h5>商品列表：</h5>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {order.items.map((item, index) => (
                  <li  key={index} style={styles.productList}>
                    <img src={item.image} alt={item.name} width="60" style={{ verticalAlign: 'middle' }} />
                    <span style={{ marginLeft: '10px' }}>{item.name}</span>
                    <span> × {item.quantity}</span>
                    <span> 单价 ${item.price.toFixed(2)}</span>
                    <div style={{display:"inline-block"}}>
                        <button onClick= {()=> {
                          setSelectedOrder(order);   // 👈 保存当前订单
                          setSelectedItem(item)
                          setShowOrderModal(true)
                        }}>查看详情</button>
                        <button>退款</button>  
                                             
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )} */}


      </div>



      {showOrderModal && (
                        <div style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            zIndex: 1000
                        }}>
                        <div style={{
                            background: '#fff', padding: '20px', borderRadius: '8px',
                            width: '400px', maxHeight: '90vh', overflowY: 'auto'
                        }}>
                        <div  style={{
                        }}>
                            <h3>订单详情</h3>

                            {selectedItem && (
                              <>
                                <h4>商品详情</h4>
                                <img src={selectedItem.image} alt={selectedItem.name} width="60" style={{ verticalAlign: 'middle' }} />
                                <p style={{ marginLeft: '20px' }}>{selectedItem.name}</p>
                                <p  style={{ marginLeft: '20px' }}> × {selectedItem.quantity}</p>
                                <p  style={{ marginLeft: '20px' }}> 单价 ${selectedItem.price.toFixed(2)}</p>
                              </>
                            )
                            }

                            {selectedOrder.shippingAddress && (
                                    <>
                                      <h4>收货地址</h4>
                                      <p>{selectedOrder.shippingAddress.recipientName}，{selectedOrder.shippingAddress.phoneNumber}</p>
                                      <p>{selectedOrder.shippingAddress.province} {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.district}</p>
                                      <p>{selectedOrder.shippingAddress.detail}</p>
                                    </>
                                    )}


                            <button onClick={()=> setShowOrderModal(false)}>返回</button>
                        </div>

                    </div>
                    </div>

                    )}

      <Footer />
    </>
  );
}


const styles = {
  productList : {
     marginBottom: '10px',
     border: "1px solid #000",
     padding: "10px",
     borderRadius: "6px",
     display:"flex",
     justifyContent:"space-between",
     alignItems: "center"
  }

}

export default MyOrders;