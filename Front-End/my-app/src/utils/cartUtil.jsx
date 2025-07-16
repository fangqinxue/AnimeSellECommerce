// utils/cartUtils.js

const LOCAL_CART_KEY = 'guest_cart';

export const getLocalCart = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const setLocalCart = (cartItems) => {
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cartItems));
};

export const addToLocalCart = (product) => {
  const cart = getLocalCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity || 1;
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 });
  }
  setLocalCart(cart);
};

export const removeFromLocalCart = (id) => {
  const cart = getLocalCart().filter(item => item.id !== id);
  setLocalCart(cart);
};

export const clearLocalCart = () => {
  localStorage.removeItem(LOCAL_CART_KEY);
};


// 增加某商品数量
export const increaseQuantity = (id) => {
  const cart = getLocalCart();
  const updatedCart = cart.map(item =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
  setLocalCart(updatedCart);
};

// 减少某商品数量（不能小于 1）
export const decreaseQuantity = (id) => {
  const cart = getLocalCart();
  const updatedCart = cart.map(item =>
    item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  setLocalCart(updatedCart);
};
