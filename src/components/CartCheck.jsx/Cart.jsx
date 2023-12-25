import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartPOS from "./elements/CartSummary";
import CartItems from "./elements/CartItems";
import CartSummary from "./elements/CartSummary";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  const [totalPrices, setTotalPrices] = useState([]);

  // const [Product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const initialCounts = cartItems.map(() => 1);
  //   setCounts(initialCounts);
  //   setProduct(cartItems);
  // }, [cartItems]);

  // useEffect(() => {
  //   const extractedSubCategoryIds = Product.map(
  //     (subcategory) => subcategory.subcategory_id
  //   );

  //   console.log(JSON.stringify(extractedSubCategoryIds));
  // }, []);

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
                  Kuch Bhi Dal
                </Typography>

                {cartItems.map((subcategory, index) => (
                  <Card className="rounded-md my-2 px-2" key={subcategory.id}>
                    <div className="py-2">
                      {subcategory.items.map((item) => (
                        <div
                          key={item.item_id}
                          className="my-3 px-2 grid grid-cols-4 items-center"
                        >
                          <div>
                            <Typography variant="h6" color="blue-gray">
                              {item.item_name}
                            </Typography>
                          </div>
                          <div>
                            <div className="flex w-max items-end gap-2">
                              <Button
                                color="red"
                                className="px-3 py-0 text-xl"
                                size="sm"
                              >
                                -
                              </Button>
                              {/* {counts[index]} */}
                              <Button
                                color="green"
                                className="px-3 py-0 text-xl"
                                size="sm"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="w-20">
                            <Input placeholder="Add Note" label="Add Note" />
                          </div>
                          <div className="flex justify-end">
                            <Typography variant="h6" color="blue-gray">
                              ${" "}
                              {/* {parseFloat(
                                item.item_price * counts[index]
                              ).toFixed(2)} */}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
        <CartSummary />
      </div>
    </div>
  );
};

export default Cart;
