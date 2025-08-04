import { useEffect , useState} from "react";
import NavBar from "../Components/naviBar/naviBar"
import Footer from '../Components/footer/footer';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { addToLocalCart } from "../utils/cartUtil";
import { Rate } from 'antd';



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

    const [image, setImage] = useState(null); // 初始化为空

    // 等 product 加载完之后设置默认图
    useEffect(() => {
      if (product && product.images && product.images.length > 0) {
        setImage(product.images[0]);
      }
    }, [product]);
  
    if (loading) return <p>加载中...</p>;
    if (!product) return <p>找不到该商品。</p>;

    var address = "http://localhost:3000"+product.images[0]

    const imgItems = product.images






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

      const styles = {
        productDetailContainer:{
          display:"flex",
          alignItems: 'center', 
          width:'60%',
          justifyContent: 'space-between',
          margin:'0 auto',
          gap:'50px'
        },
        changeButton: {

          padding: '8px 12px',
          backgroundColor: '#F4A460',
          border: 'none',
          cursor: 'pointer',
          width:'50px',
          height:'50px',
          fontSize:'30px',



        }


      }


    return(
        <>
            <NavBar></NavBar>
            <div style={styles.productDetailContainer}>
              <div>

                      
                      <img 
                      src={`http://localhost:3000${image}`} 
                      alt={product.name} 
                      style={{ width: '400px', height: 'auto' ,borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      />
                      <div style={{ display: 'flex', marginTop: '10px' }}>
                        {imgItems.map((item, index) => (
                          <img
                            key={index}
                            onClick={() => setImage(item)}
                            src={`http://localhost:3000${item}`}
                            alt={`Thumbnail ${index}`}
                            style={{
                              width: '80px',
                              height: '80px',
                              marginRight: '10px',
                              border: image === item ? '2px solid #1890ff' : '1px solid #ccc',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              objectFit: 'cover',
                            }}
                          />
                        ))}
                      </div>

              </div>

              <div style={{ width: '500px', height: 'auto' }} >
                    <div style={{borderBottom:'2px solid black', 
                      display: 'flex',
                      flexDirection:'column',
                      alignItems: 'flex-start', 
                      justifyContent: 'center', 
                      margin: '10px 0',
                       }}>
                        <h2 style={{fontSize:'35px'}}>{product.name}</h2>
                          <div style={{fontSize:'20px', display:"flex", alignItems:'center', gap:'30px'}}>
                              <Rate 
                              disabled={true}
                              allowHalf
                              value={product.rating}/>
                              <p>{product.rating}</p>
                          </div>
                        <p style={{fontSize:'25px', fontWeight:'bold'}}>${product.price}</p>
                        <p style={{fontSize:'18px',color:'#6495ED'}}> Release date : {product.release_date.slice(0, 10)}</p>
                        <p style={{color:'#48D1CC'}}>Stock : {product.stock}</p>
                        <p style={{color:'#2E8B57'}}>Quantity</p>
                        <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                          <button className="changeButton" onClick={decrease} style={styles.changeButton}>-</button>
                          <span style={{ margin: '0 8px' , fontSize:'20px'}}>{quantity}</span>
                          <button className="changeButton" onClick={increase} style={styles.changeButton}>+</button>
                        </div>

                      <button className='addToCart' onClick={handleAddToCart} style={{width: "400px",height:'60px', marginBottom:'40px'}}>Add To Cart</button>

                      
                    </div>
                    <div>
                      <p style={{fontSize:'30px'}}>Description</p>
                      <p>{product.description}</p>

                    </div>
                    

              </div>

            </div>

            <Footer></Footer>
        
        
        
        
        </>

    )


}

export default ProductDetail