import React from 'react';
import "./productCart.css";
import { MdAddShoppingCart } from "react-icons/md";
import {  addToLocalCart } from '../../utils/cartUtil';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {

    var address = "http://localhost:3000"+product.images[0]

    const alink= "/productdetail/" + product._id

    var address = "http://localhost:3000"+product.images[0]





  return (
    <Link to={alink} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="productcart">
      <img
        src={address}
        alt={product.name}
      />
      <div>
      <h2 className="productCardName">{product.name}</h2>
      <p className="" style={{overflow:'hidden'}}>{product.character} — {product.anime}</p>
      <p className="productCardPrice">${product.price.toFixed(2)}</p>
      <button onClick={(e)=>{
        e.stopPropagation();
        e.preventDefault();
        addToLocalCart({ 
          id: product._id || product.id, 
          name: product.name,
          character: product.character,
          anime: product.anime,
          price: product.price,
          seller: product.seller,
          stock: product.stock,//添加商品的数量

          image: address,      // 添加图片地址
          quantity: 1         // 默认加一件
        })}} className='addToCart'>Add to Cart </button>

      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
