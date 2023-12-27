import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartSummary from "./elements/CartSummary";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  // Array to store counts for each item
  const [totalPrices, setTotalPrices] = useState([]); // Array to store total prices for each item
  const [UpdatedPayload, setUpdatedPayload] = useState(0); // Array to store total prices for each item
  const [totalAmount, setTotalAmount] = useState(0); // Total payable amount

  const [Product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    setProduct(cartItems);
  }, [cartItems]);

  // useEffect(() => {
  //   // Calculate total amount for each item and update the state
  //   const updatedProduct = Product.map((item) => ({
  //     ...item,
  //     total: item.price * item.quantity,
  //   }));
  //   setProduct(updatedProduct);
  // }, [Product]);
  // useEffect(() => {
  //   // Calculate overall total amount for all items in the cart
  //   const total = Product.reduce((sum, item) => sum + item.total, 0);
  //   setTotalAmount(total);
  // }, [Product]);
  return (
    <div className="px-5 bg-white h-screen">
      <div className="py-4 px-10 flex justify-end ">
        <Link to={"/pos"}>
          <IoMdClose className="text-gray-700" fontSize={24} />
        </Link>
      </div>
      <div className=" grid grid-cols-3 ">
        {/* <CartPOS /> */}
        <div className="col-span-2">
          <div className="p-2 ">
            <Card className="bg-gray-100 h-[80vh]">
              <CardBody>
                <Typography variant="h4" color="blue-gray">
                  Cart
                </Typography>
                {Product.map((subcategory) => (
                  <Card
                    className="rounded-md my-2 px-2"
                    key={subcategory.subcategory_id}
                  >
                    <div className="my-3 px-2 grid grid-cols-4 items-center">
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {subcategory.name}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {subcategory.quantity}
                        </Typography>
                      </div>

                      <div className="w-20">
                        <Input placeholder="Add Note" label="Add Note" />
                      </div>
                      <div className="flex justify-end">
                        <Typography variant="h6" color="blue-gray">
                          $ {parseFloat(subcategory.price).toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
        <CartSummary items={0} totalAmount={0} />
        {/* <CartSummary items={UpdatedPayload} totalAmount={totalAmount} /> */}
      </div>
    </div>
  );
};

export default Cart;
