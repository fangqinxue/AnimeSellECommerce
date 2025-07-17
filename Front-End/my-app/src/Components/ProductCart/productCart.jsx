import React from 'react';
import "./productCart.css";
import { MdAddShoppingCart } from "react-icons/md";
import {  addToLocalCart } from '../../utils/cartUtil';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    var address = "http://localhost:3000"+product.images[0]




    const alink= "/productdetail/" + product._id


  return (
    <Link to={alink} style={{ textDecoration: 'none', color: 'inherit' }}>
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

      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
