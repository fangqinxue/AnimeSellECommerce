
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';




    
    function SellerOrder() {
      const [orders, setOrders] = useState([]);
      const seller = JSON.parse(localStorage.getItem("seller")); // 从 localStorage 获取卖家信息
      const sellerId = seller.id;
      console.log(seller.id)
      const [loading, setLoading] = useState(false);

    
      useEffect(() => {
        fetchOrders();
      }, []);
    
      const fetchOrders = async () => {
        setLoading(true);
        try {
          // 请求卖家的所有订单
          console.log(sellerId)
          const res = await axios.get(`http://localhost:3000/api/order/seller/${sellerId}`);
          console.log(res.data)
          setOrders(res.data);
        } catch (err) {
          console.error("获取订单失败", err);
        }
        setLoading(false);
      };

      const columns = [
        {
          title: '订单号',
          dataIndex: '_id',
          key: '_id',
          width: 220,
        },
        {
          title: '下单时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
          width: 180
        },
        {
          title: '买家邮箱',
          dataIndex: 'userEmail',
          key: 'userEmail',
          width: 200
        },
        {
          title: '收货信息',
          dataIndex: 'shippingAddress',
          key: 'shippingAddress',
          render: (addr) => (
            <div>
              <div>{addr.recipientName} / {addr.phoneNumber}</div>
              <div>{addr.province} {addr.city} {addr.district} {addr.detailAddress}</div>
            </div>
          ),
          width: 280
        },
        {
          title: '商品列表',
          dataIndex: 'items',
          key: 'items',
          render: (items) => (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 40, height: 40, marginRight: 8, objectFit: 'cover', borderRadius: 4 }}
                  />
                  <div>
                    <div>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>
                      {item.anime} / {item.character} × {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
          width: 320
        },
        {
          title: '总额(¥)',
          dataIndex: 'sellerTotal',
          key: 'sellerTotal',
          render: (total) => total.toFixed(2),
          width: 100
        },
        {
          title: '物流状态',
          dataIndex: 'items',
          key: 'logisticsStatus',
          render: (items) => {
            // 假设订单的物流状态取第一个商品的
            const status = items[0]?.logisticsStatus;
            let color = 'blue';
            if (status === '待发货') color = 'orange';
            if (status === '已发货') color = 'green';
            if (status === '退货中') color = 'red';
            return <Tag color={color}>{status}</Tag>;
          },
          width: 100
        }
      ];
    
      return (
        <div style={{ padding: "20px" }}>
          <h2>📦 我的订单</h2>
    
          {loading ? (
            <p>加载中...</p>
          ) : orders.length === 0 ? (
            <p>暂无订单</p>
          ) : (
            
            <Table 
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1400 }}
            />
            
            




          )}
        </div>
      );
    }



export default SellerOrder