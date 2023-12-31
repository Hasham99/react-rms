import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { remove, clearAll } from "../../redux/CartSlice"; //path to your cart slice
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

  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleRemove = (index) => {
    dispatch(remove(index));
  };
  const handleClearAll = () => {
    dispatch(clearAll());
  };
  useEffect(() => {
    console.log(cartItems);
    setProduct(cartItems);
    // Calculate total amount
    const newTotalAmount = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalAmount(newTotalAmount);
  }, [cartItems]);

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
                <div className="flex gap-3 items-center">
                  <Typography variant="h4" color="blue-gray">
                    Cart
                  </Typography>
                  <Link onClick={handleClearAll}>
                    <Typography variant="h6" color="red">
                      (Clear All)
                    </Typography>
                  </Link>
                </div>
                {Product.map((subcategory, index) => (
                  <Card
                    className="rounded-md my-2 px-2"
                    key={subcategory.index}
                  >
                    <div className="my-3 px-2 grid grid-cols-4 items-center">
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {subcategory.name}
                          <Link onClick={() => handleRemove(index)}>
                            <div className="font-light">Remove</div>
                          </Link>
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
        <CartSummary items={Product} totalAmount={totalAmount} />
      </div>
    </div>
  );
};

export default Cart;
