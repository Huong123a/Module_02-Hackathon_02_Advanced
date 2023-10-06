import React, { useState } from "react";
import { Product } from "../model/data";

interface Props {
  data: Product[];
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

function Store(props: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: Product) => {
    const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingCartItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      const newCartItem: CartItem = { id: item.id, product: item, quantity: 1 };
      const updatedCart = [...cart, newCartItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCart(updatedCart);
      const event = new Event("cartUpdated");
      window.dispatchEvent(event);
    }
  };
  

  return (
    <div className="content">
      {props.data &&
        props.data.map((product, index) => (
          <div className="content-img" key={product.id}>
            <img src={product.imageUrl} alt="" />
            <div className="footer-content">
              <div>
                <h4>{product.name}</h4>
                <p>{product.des}</p>
              </div>
              <div className="card-footer">
                <p>Giá: {product.price.toLocaleString()}$</p>
                <span>
                  <button onClick={() => handleAddToCart(product)}>Add</button>
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Store;
