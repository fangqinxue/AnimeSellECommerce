import { useEffect , useState} from "react";
import NavBar from "../Components/naviBar/naviBar"
import Footer from '../Components/footer/footer';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { addToLocalCart } from "../utils/cartUtil";
import { MdAddShoppingCart } from "react-icons/md";


function ProductDetail () {

    const [quantity, setQuantity] = useState(1);

    const increase = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
    };

    const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    };

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const tureid = id

  
    useEffect(() => {
      axios.post(`http://localhost:3000/api/product/getProductById`,{prod:tureid})
        .then(res => {
            console.log(res.data[0])
          setProduct(res.data[0]);
          setLoading(false);
        })
        .catch(err => {
          console.error("获取商品失败:", err);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) return <p>加载中...</p>;
    if (!product) return <p>找不到该商品。</p>;

    var address = "http://localhost:3000"+product.images[0]




    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem('guest_cart')) || [];
        const existing = currentCart.find(item => item.id === product._id);
        const totalDesired = (existing?.quantity || 0) + quantity;
    
      
        if (totalDesired > product.stock) {
          alert(`❌ 购物车中已经存在导致库存不足，库存只剩 ${product.stock} 件`);
          return;
        }


        addToLocalCart({ 
          id: product._id || product.id, 
          name: product.name,
          character: product.character,
          anime: product.anime,
          price: product.price,
          seller: product.seller,
          stock: product.stock,//添加商品的数量

          image: address,      // 添加图片地址
          quantity: quantity         // 默认加一件
        });
        alert('✅ 已添加到购物车');
      };


    return(
        <>
            <NavBar></NavBar>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>{product.name}</h2>
                    <img 
                    src={`http://localhost:3000${product.images[0]}`} 
                    alt={product.name} 
                    style={{ width: '300px', height: 'auto' }}
                    />
                    <p>动漫：{product.anime}</p>
                    <p>角色：{product.character}</p>
                    <p>价格：${product.price}</p>
                    <p>库存：{product.stock}</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                    <button onClick={decrease} style={{ padding: '5px 10px' }}>-</button>
                    <span style={{ margin: '0 15px' }}>{quantity}</span>
                    <button onClick={increase} style={{ padding: '5px 10px' }}>+</button>
                    </div>

                    <button className='shopcartsure' onClick={handleAddToCart}><MdAddShoppingCart /></button>
                </div>
            <Footer></Footer>
        
        
        
        
        </>

    )


}

export default ProductDetail