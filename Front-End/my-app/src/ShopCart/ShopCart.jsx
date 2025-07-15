import { useEffect , useState} from "react";
import NavBar from "../Components/naviBar/naviBar"
import {
    getLocalCart,
    removeFromLocalCart,
  } from '../utils/cartUtil';


function ShopCart () {

    //此处我们用的是react的方法来实现页面的自动刷新，整页刷新可以使用Window.location.reload()
    const [ShopcartAll, setShopcartAll] = useState([])
    
    useEffect ( ()=> {
        setShopcartAll(getLocalCart())
    },[])

    console.log(ShopcartAll)

    const removeItem = (item) => {
        removeFromLocalCart(item)
        setShopcartAll(getLocalCart())
        console.log(ShopcartAll)

    }


    return (
        <div>

            <NavBar></NavBar>


                <div className="cart">

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




        </div>
        
    )


}

export default ShopCart