import React from 'react';
import "./productCart.css";

const ProductCard = ({ product }) => {

    var address = "http://localhost:3000"+product.images[0]


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
      </div>
    </div>
  );
};

export default ProductCard;
