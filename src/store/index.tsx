import React, { useState } from "react";
import { Product } from "../model/data";
interface Props {
  data: Product[];
}
function Store(props: Props) {
  const [cart, setCart] = useState<any>([]);
  const handleAddToCart = (item: any) => {
    let newLineItems = [];
    newLineItems = [...cart];
    newLineItems.push(item);
    setCart(newLineItems);
  };
  
  const handleRemoveFromCart = (id: any) => {
    setCart(cart.filter((item: any) => item.id !== id));
  };
  const cartSum = () => {
    let sum = 0;
    cart?.forEach((item: any) => (sum += item.quantity * item.product.price));
    return sum;
  };

  const cartCount = () => {
    let sum = 0;
    cart?.forEach((item: any) => (sum += item.quantity));
    return sum;
  };
  return (
    <div className="content">
      {props.data &&
        props.data.map((product, index) => (
          <div className="content-img">
            <img src={product.imageUrl} alt="" />
            <div className="footer-content">
              <div>
                <h4>{product.name}</h4>
                <p>{product.des}</p>
              </div>
              <div className="card-footer">
                <p>Giá:{product.price.toLocaleString()}$</p>
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
