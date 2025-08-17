import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";

import { Layout, Menu } from 'antd';
import { Link, Routes, Route } from "react-router-dom";
const { Header, Content, Sider } = Layout;

import SellerAddProduct from "./SellerAddProduct";
import SellerOrder from './SellerOrder';
import SellerProduct from './SellerProduct';
import PendingOrders from './SellerOrderSendPackage';
import ReturnedOrders from './SellerRefund';

function SellerDashboard () {

  const [openKeys, setOpenKeys] = useState(["orders"]);
  const [selectedKeys, setSelectedKeys] = useState(["orders_all"]);

  // 当前选中的 key
  const [activeKey, setActiveKey] = useState("orders_all");

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


    const menuItems = [
      {
        key:'main',
        label:'Main Page'
      },
      {
        key: "orders",
        icon: <ShoppingCartOutlined />,
        label: "Order Management",
        children: [
          { key: "orders_all", label: "全部订单" },
          { key: "orders_pending", label: "待发货" },
          { key: "orders_returned", label: "退货管理" }
        ]
      },
      {
        key: "products",
        icon: <ShoppingOutlined />,
        label: "Product Management",
        children: [
          { key: "products_all", label: "全部商品" },
          { key: "products_add", label: "添加商品" }
        ]
      }
    ];



    const renderContent = () => {
      switch (activeKey) {
        case "orders_all":
          return <SellerOrder />;
        case "orders_pending":
          return <PendingOrders />;
        case "orders_returned":
          return <ReturnedOrders />;
        case "products_all":
          return <SellerProduct />;
        case "products_add":
          return <SellerAddProduct />;
        default:
          return <div>请选择一个菜单项</div>;
      }
    };
      // 菜单展开
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  // 菜单选中
  const onSelect = ({ key }) => {
    setSelectedKeys([key]);
    setActiveKey(key);
  };



    return(

      
    <Layout style={{ Height: '100vh'}}>
      <Header style={{ height:'10vh',background: '#fff', padding: 0}}>
        <div>Seller Dashboard</div>  
      </Header>

      <Layout  style={{ height: "90vh" }}>
      <Sider>

      <Menu
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            onSelect={onSelect}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
      </Sider>
        
        <Content style={{ margin: '16px', overflow: 'auto'}}>
        {renderContent()}
        </Content>
      </Layout>
    </Layout>
  
          // <div style={styles.container}>
          //   <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          //   <h1 style={styles.heading}>Welcome Back , {seller.shopName} 👋</h1>
          //   <button
          //           onClick={() => {
          //             localStorage.removeItem('seller');
          //             localStorage.removeItem('sellerToken');
          //             window.location.href = '/sellerLogin'; // 或者使用 navigate('/seller/login')
          //           }}
          //           style={{
          //             width:'150px',
          //             padding: '8px 16px',
          //             backgroundColor: '#E17912',
          //             color: '#fff',
          //             border: 'none',
          //             borderRadius: '5px',
          //             cursor: 'pointer',
          //             fontWeight: 'bold'
          //           }}
          //           >
          //           log out
          //           </button>

          //   </div>


          //   <div style={styles.cardSection}>
          //     <div style={styles.card}>
          //       <h3>Seller ID</h3>
          //       <p>{seller.id}</p>
          //     </div>
          //     <div style={styles.card}>
          //       <h3>Email</h3>
          //       <p>{seller.userEmail}</p>
          //     </div>
          //     {/* 可扩展更多信息 */}
          //   </div>

          //   <div style={styles.statsSection}>
          //     <div style={styles.statCard}>
          //       <h4>Total Order</h4>
          //       <p>--</p>
          //     </div>
          //     <div style={styles.statCard}>
          //       <h4>Product Quantity</h4>
          //       <p>--</p>
          //     </div>
          //     <div style={styles.statCard}>
          //       <h4>Total income</h4>
          //       <p>--</p>
          //     </div>
          //   </div>

          //   <div style={styles.links}>
          //     <button style={styles.linkButton} onClick={() => navigate('/seller/products')}>管理商品</button>
          //     <button style={styles.linkButton} onClick={() => navigate('/seller/orders')}>查看订单</button>
          //   </div>
          // </div>

    )
      
  }

export default SellerDashboard