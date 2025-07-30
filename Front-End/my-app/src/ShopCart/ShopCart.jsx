import { useEffect , useState} from "react";
import NavBar from "../Components/naviBar/naviBar"
import {
    getLocalCart,
    removeFromLocalCart,
    clearLocalCart,
    increaseQuantity,
    decreaseQuantity,
  } from '../utils/cartUtil';
import Footer from '../Components/footer/footer'
import { isLoggedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopCart () {

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    //此处我们用的是react的方法来实现页面的自动刷新，整页刷新可以使用Window.location.reload()
    const [ShopcartAll, setShopcartAll] = useState([])
    const navigate = useNavigate();

    const username = JSON.parse(localStorage.getItem('user'));

    useEffect ( ()=> {
        setShopcartAll(getLocalCart())
    },[])


    const removeItem = (item) => {
        removeFromLocalCart(item)
        setShopcartAll(getLocalCart())

    }

    const handlePay = async() => {
        if (ShopcartAll.length === 0) {
          alert("🛒 购物车为空，无法支付！");
          return;
        }

        if (!isLoggedIn()) {
            const shouldLogin = confirm("🔐 您需要登录后才能支付。现在去登录吗？");
            if (shouldLogin) {
                // Redirect to login page
                window.location.href = '/login';
                // Or use your routing system
                return;
            }
            return;
        }

        try {
            const email = username.email // 你也可以从 localStorage 或 state 中获取
            const res = await axios.get(`http://localhost:3000/api/address/getUserAddresses`, {
              params: { email }
            });

              console.log(res.data)
            setAddressList(res.data.addresses || []);

            console.log(addressList)
            if (res.data.addresses.length > 0) {
              setSelectedAddressId(res.data.addresses[0].id);
            }
            setShowAddressModal(true);
          } catch (err) {
            alert('获取地址失败：' + (err.response?.data?.message || err.message));
          }



        // navigate('/checkout');
        // // alert("✅ 支付成功！");
        // // clearLocalCart();
        // // setShopcartAll([]);
      };

    const totalPrice = ShopcartAll.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>

            <NavBar></NavBar>


                <div className="">

                    <h2>Shopping Cart</h2>


                    {ShopcartAll.length === 0 ? (
                        <p>您的购物车是空的。</p>
                        ) : (
                        ShopcartAll.map((item) => (
                            <div
                            key={item.id}
                            style={{
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                                padding: "10px",
                                display: "flex",
                                alignItems: "center",
                            }}
                            >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "100px", marginRight: "20px" }}
                            />
                            <div style={{ flex: 1 }}>
                                <h4>{item.name}</h4>
                                <p>{item.character} - {item.anime}</p>
                                <p>价格：${item.price.toFixed(2)}</p>
                                <p>数量：{item.quantity}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button onClick={() => {
                                    decreaseQuantity(item.id);
                                    setShopcartAll(getLocalCart());
                                }}>➖</button>

                                <span>{item.quantity}</span>

                                <button onClick={() => {
                                    const currentItem = ShopcartAll.find(p => p.id === item.id);
                                    console.log(currentItem.stock)
                                    if (currentItem.quantity >= currentItem.stock) {
                                        alert('该商品已达到库存上限');
                                        return;
                                    }
                                    increaseQuantity(item.id);
                                    setShopcartAll(getLocalCart());
                                }}>➕</button>
                            </div>
                            <button onClick={() => removeItem(item.id)}>❌ 移除</button>
                            </div>
                            ))
                        )}                               
                </div>

                <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <p style={{ fontWeight: 'bold' }}>总价：${totalPrice.toFixed(2)}</p>
                    <button
                        onClick={handlePay}
                        style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                        }}
                    >
                        💳 去支付
                    </button>
                </div>



                    {showAddressModal && (
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
                        <div  style={{display:'flex',justifyContent:'space-between'
                        }}>
                            <h3>选择收货地址</h3>
                            <button>+ 新增地址</button>
                        </div>



                        {addressList.length === 0 ? (
                            <p>暂无地址，请添加一个 👇</p>
                            ) : (
                                    <select
                                    value={selectedAddressId}
                                    onChange={(e) => setSelectedAddressId(e.target.value)}
                                    style={{ width: '100%', marginBottom: '10px',height:"30px" }}
                                    >
                                    {addressList.map((addr) => (
                                        <option key={addr._id} value={addr._id}>
                                            {addr.detail}（{addr.recipientName} / {addr.phoneNumber}）
                                        </option>
                                    ))}
                                    </select>
                                )}


                    



                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => setShowAddressModal(false)}>取消</button>
                    <button
                        onClick={() => {
                            if (!selectedAddressId) {
                                alert('请选择地址');
                                return;
                            }
                            localStorage.setItem('selectedAddressId', selectedAddressId);


                            setShowAddressModal(false);
                            navigate('/checkout');
                        }}
                    >
                    确认地址并支付 →
                    </button>
                    </div>
                    </div>
                    </div>
                    )}



                <Footer></Footer>
        </div>
        
    )


}

export default ShopCart