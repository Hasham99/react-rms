import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const CartPOS = () => {
  const [Product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    setProduct(cartItems);
  }, [cartItems]);

  return (
    <Card className="h-full rounded-xl ">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      ></CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          Cart
        </Typography>

        <div className="bg-blue-gray-900 shadow-lg my-4 border-2 p-3  rounded-xl overflow-y-scroll max-h-[470px] ">
          <div className="flex justify-between px-2 text-white ">
            <div>id</div>
            <div>price</div>
            <div>quantity</div>
            <div>total</div>
            <div className="cursor-pointer text-red-600">X</div>
          </div>
          <div className=" my-4">
            {Product.map((subcategory) => (
              <div key={subcategory.id}>
                {subcategory.items.map((item) => (
                  <div
                    key={item.item_id}
                    className=" my-4 flex justify-between bg-white py-3 px-2 rounded-lg "
                  >
                    <div>{item.item_id}</div>
                    <div>{item.item_price}</div>
                    <div>quantity</div>
                    <div>total</div>
                    <div className="cursor-pointer text-red-600">X</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
    // <div className="bg-slate-300 m-2 h-full">
    //   <div className="grid grid-cols-2 overflow-y-scroll max-h-[85vh]">
    //     {cartItems.map((item) => (
    //       <div className=" cursor-pointer h-20 block m-2 max-w-sm p-2 bg-teal-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
    //         <h5 className="mb-2 text-xs  tracking-tight font-bold text-black">
    //           {item.title}
    //         </h5>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default CartPOS;
