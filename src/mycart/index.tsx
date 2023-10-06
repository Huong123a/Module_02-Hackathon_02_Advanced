import React, { useEffect, useState } from "react";
import { Product } from "../model/data";

interface CartItem {
  product: Product;
  quantity: number;
}

function MyCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempCart, setTempCart] = useState<CartItem[]>([]); // Giỏ hàng tạm thời
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedItems);
    setTempCart(storedItems);
  }, []);
  
  useEffect(() => {
    const updateCartHandler = () => {
      const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(storedItems);
      setTempCart(storedItems);
    };
  
    window.addEventListener("cartUpdated", updateCartHandler);
  
    return () => {
      window.removeEventListener("cartUpdated", updateCartHandler);
    };
  }, [cartItems]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsPaymentSuccessful(false); // Reset trạng thái thanh toán khi mở modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateQuantity = (item: CartItem, newQuantity: number) => {
    // Kiểm tra để đảm bảo số lượng không nhỏ hơn 0
    newQuantity = Math.max(newQuantity, 0);

    const updatedCart = tempCart.map((cartItem) =>
      cartItem === item ? { ...cartItem, quantity: newQuantity } : cartItem
    );

    setTempCart(updatedCart);

    // Cập nhật giỏ hàng và lưu vào localStorage sau khi cập nhật số lượng
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return tempCart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Thực hiện cập nhật giỏ hàng tạm thời khi có sự thay đổi trong giỏ hàng thật
  useEffect(() => {
    setTempCart(cartItems);
  }, [cartItems]);

  const handleClearCart = () => {
    // Xóa toàn bộ sản phẩm khỏi giỏ hàng và xóa key "cartItems" từ localStorage
    setCartItems([]);
    localStorage.removeItem("cartItems");
    
    // Cập nhật giỏ hàng tạm thời (tempCart) để nó trống
    setTempCart([]);
  
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const handlePayment = () => {
    // Xử lí thanh toán ở đây, có thể là gửi dữ liệu đơn hàng lên server và xử lí ở phía server.

    // Sau khi thanh toán thành công, cập nhật trạng thái thanh toán để hiển thị thông báo
    setIsPaymentSuccessful(true);
  };

  return (
    <div>
      <button onClick={openModal}>Giỏ hàng của bạn</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Giỏ hàng của bạn</h2>
            <ul>
              {tempCart.map((item, index) => (
                <li key={index}>
                  {item.product.name} - Số lượng:{" "}
                  <button onClick={() => updateQuantity(item, item.quantity - 1)}>
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item, item.quantity + 1)}>
                    +
                  </button>
                  - Giá: {item.product.price * item.quantity}$
                </li>
              ))}
            </ul>
            <p>Tổng cộng: {calculateTotal()}$</p>
            <button onClick={handlePayment}>Thanh toán</button>
            <button onClick={handleClearCart}>Xóa toàn bộ</button>
            <button onClick={closeModal}>Đóng</button>
            {isPaymentSuccessful && (
              <p>Cảm ơn bạn đã mua hàng! Thanh toán thành công.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCart;
