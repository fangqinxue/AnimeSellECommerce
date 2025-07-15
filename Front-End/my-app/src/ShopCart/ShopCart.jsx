import { useEffect , useState} from "react";
import NavBar from "../Components/naviBar/naviBar"
import {
    getLocalCart,
    removeFromLocalCart,
    clearLocalCart
  } from '../utils/cartUtil';
import Footer from '../Components/footer/footer'
import { isLoggedIn } from "../utils/auth";

function ShopCart () {

    //此处我们用的是react的方法来实现页面的自动刷新，整页刷新可以使用Window.location.reload()
    const [ShopcartAll, setShopcartAll] = useState([])
    
    useEffect ( ()=> {
        setShopcartAll(getLocalCart())
    },[])

    console.log(ShopcartAll)
    console.log(localStorage)

    const removeItem = (item) => {
        removeFromLocalCart(item)
        setShopcartAll(getLocalCart())
        console.log(ShopcartAll)
    }

    const handlePay = () => {
        if (ShopcartAll.length === 0) {
          alert("🛒 购物车为空，无法支付！");
          return;
        }

        if (isLoggedIn) {
            const shouldLogin = confirm("🔐 您需要登录后才能支付。现在去登录吗？");
            if (shouldLogin) {
                // Redirect to login page
                window.location.href = '/login';
                // Or use your routing system
                return;
            }
            return;
        }




    
        alert("✅ 支付成功！");
        clearLocalCart();
        setShopcartAll([]);
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


                <Footer></Footer>
        </div>
        
    )


}

export default ShopCart