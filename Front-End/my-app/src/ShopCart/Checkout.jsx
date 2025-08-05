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
            alert('You do not select an address.');
            window.location.href = '/shopcart'; // 跳回购物车
            return;
          }
    
          try {
            const res = await axios.get(`http://localhost:3000/api/address/getAddressById`, {
              params: { id: selectedAddressId }
            });
            setAddress(res.data.address);
          } catch (err) {
            console.error("error", err);
            alert("❌ error");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAddress();


  }, [selectedAddressId]);

  if (isLoading) return <p style={{ textAlign: 'center' }}>loading...</p>;

  console.log(address)

  if (!item || item.length === 0) return <p style={{ textAlign: 'center' }}>You haven't select a product</p>;
  const totalPrice = item.reduce((sum, product) => sum + product.price * product.quantity, 0);//循环遍历array方法

  const user = JSON.parse(localStorage.getItem('user')) || [];
  const userEmail= user.email

  const handleCheckOut = async() => {
    const shouldPay = window.confirm("🛒 Are you sure to pay?");

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
          alert('✅ Pay successfully, already generate order！');
          localStorage.removeItem('guest_cart');
          localStorage.removeItem('selectedAddressId');
          window.location.href = "/";
        } else {
          alert('❌ fail to pay：' + res.data.message);
        }
      } catch (err) {
        console.error("fail to pay", err);
        alert("❌ network error or else");
      }

  }

  

  return (
    <>
      <NavBar />

      
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{fontSize:'50px', color:'orange'}}>Order</h2>

        


        
            {item.map((product) => (
            <div key={product.id} style={{borderRadius:'10px', border: "1px solid #ccc", margin: "20px 200px",minWidth:'700px', padding: "10px" ,display:'flex', gap:'40px', alignItems:'center',justifyContent:'space-between'}}>
                <img src={product.image} alt={product.name} style={{borderRadius:'10px', width: '200px' }} />
                <div style={{textAlign:"left", width:'100px'}}>
                <p>{product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
                <p>Total Price: ${(product.price * product.quantity).toFixed(2)}</p>
                </div>
                        {address ? (
                  <div style={{
                    textAlign: 'left',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}>
                    <h4>📦 Order Address</h4>
                    <p>{address.detail}</p>
                    <p>Recipient Name: {address.recipientName}</p>
                    <p>Phone: {address.phoneNumber}</p>
                  </div>
                ) : (
                  <p>No Address</p>
                )}

            </div>
            ))}
        
        <p style={{ fontSize:'30px',fontWeight: 'bold', margin:'50px 20px',color:'DeepSkyBlue' }}>Total Price ${totalPrice.toFixed(2)}</p>
        <button style={{ width:'300px',padding: '10px 20px', background: 'Chocolate', color: 'white' }} onClick={handleCheckOut}>Pay</button>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;