import React, { useEffect, useState } from 'react';
import { Table,Popconfirm, Tag,Button } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';


function ReturnedOrders () {
    const [orders, setOrders] = useState([]);
    const seller = JSON.parse(localStorage.getItem("seller")); // 从 localStorage 获取卖家信息
    const sellerId = seller.id;
  
    useEffect(() => {
        fetchRefundOrders();
    }, []);

    const fetchRefundOrders = async () => {
        axios.get(`http://localhost:3000/api/order/seller/${sellerId}`).then(res => {
            // 只保留待发货的订单
            const refund = res.data.filter(order =>
              order.items.some(item => item.logisticsStatus === '退货中')
            );
            setOrders(refund);
          });
      };

    const handleRefund = async (orderId, itemId) => {
        try {
          await axios.patch(`http://localhost:3000/api/order/seller/orders/${orderId}/items/${itemId}/refund`);
 
          fetchRefundOrders(); // 更新表格
        } catch (err) {

        }
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
            const status = items[0]?.logisticsStatus;
            return <Tag color="orange">{status}</Tag>;
          },
          width: 100
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <div>
                {record.items.map((item) => (
                  item.logisticsStatus === '退货中' && (
                    <Popconfirm
                      key={item.id}
                      title="确认退货"
                      description="确定同意退货吗？"
                      onConfirm={() => handleRefund(record._id, item._id)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type="primary" size="small" style={{ marginBottom: 4 }}>
                        确认退货
                      </Button>
                    </Popconfirm>
                  )
                ))}
              </div>
            )
          }
      ];



    return(
        <Table
        rowKey="_id"
        columns={columns}
        dataSource={orders}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1400 }}
      />
    )
  


}

export default ReturnedOrders