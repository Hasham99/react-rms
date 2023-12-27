import React from "react";
import ProductsPOS from "./elements/ProductsPOS";
import CartPOS from "./elements/CartPOS";
import Counter from "./elements/counter";

const Pos = () => {
  return (
    <div className="">
      <div className="p-2">
        <ProductsPOS />
      </div>
      {/* <div className="p-2">
        <CartPOS />
        <Counter />
      </div> */}
    </div>
  );
};

export default Pos;
