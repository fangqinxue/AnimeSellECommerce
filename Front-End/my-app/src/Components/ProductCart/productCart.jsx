import React from 'react';
import "./productCart.css";
import { MdAddShoppingCart } from "react-icons/md";
import {  addToLocalCart } from '../../utils/cartUtil';

const ProductCard = ({ product }) => {

    var address = "http://localhost:3000"+product.images[0]


    const handleAddToCart = () => {
      addToLocalCart({ 
        id: product._id || product.id, 
        name: product.name,
        character: product.character,
        anime: product.anime,
        price: product.price,
        stock: product.stock,//添加商品的数量
        image: address,      // 添加图片地址
        quantity: 1          // 默认加一件
      });
      alert('✅ 已添加到购物车');
    };

    


  return (
    <div className="productcart">
      <img
        src={address}
        alt={product.name}
        className="h-48 w-full object-contain mb-4"
      />
      <div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.character} — {product.anime}</p>
      <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
      <button className='shopcartsure' onClick={handleAddToCart}><MdAddShoppingCart /></button>
      </div>
    </div>
  );
};

export default ProductCard;
