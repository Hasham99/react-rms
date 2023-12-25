import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartPOS from "../POS/elements/CartPOS";
import CartItems from "./elements/CartItems";
import CartSummary from "./elements/CartSummary";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  const [counts, setCounts] = useState([]); // Array to store counts for each item
  const [totalPrices, setTotalPrices] = useState([]); // Array to store total prices for each item
  const [UpdatedPayload, setUpdatedPayload] = useState([]); // Array to store total prices for each item
  const [totalAmount, setTotalAmount] = useState(0); // Total payable amount

  const [Product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);

  // console.log(cartItems);
  // // Function to increment the count for a specific item
  // const incrementCount = (index) => {
  //   const updatedCounts = [...counts];
  //   updatedCounts[index] += 1;
  //   setCounts(updatedCounts);
  // };

  // // Function to decrement the count for a specific item with a condition to keep it above 1
  // const decrementCount = (index) => {
  //   if (counts[index] > 0) {
  //     const updatedCounts = [...counts];
  //     updatedCounts[index] -= 1;
  //     setCounts(updatedCounts);
  //   }
  // };
  const prevCounts = useRef(counts);
  // Function to increment the count for a specific item
  const incrementCount = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] += 1;
      return updatedCounts;
    });
  };

  // Function to decrement the count for a specific item with a condition to keep it above 0
  const decrementCount = (index) => {
    setCounts((prevCounts) => {
      if (prevCounts[index] > 1) {
        const updatedCounts = [...prevCounts];
        if (updatedCounts[index] > 0) {
          updatedCounts[index] -= 1;
        }
        // updatedCounts[index] -= 1;
        return updatedCounts;
      }
      return prevCounts;
    });
  };
  // console.log("product", Product);
  // console.log("count", counts);

  // console.log("totalPrices", totalPrices);
  // console.log("totalAmount", totalAmount);
  // console.log("product", Product);
  // console.log(counts);

  // Initialize counts only when cartItems change
  // const memoizedCounts = useMemo(() => {
  //   return cartItems.map(() => 1);
  // }, [cartItems]);
  // Use useRef to keep track of previous counts

  // const quantityProduct = counts[index];
  useEffect(() => {
    const initialCounts = cartItems.map(() => 1);
    setCounts(initialCounts);
    setProduct(cartItems);
    // console.log(JSON.stringify(Product));
    // console.log(Product);
    // Convert the payload to the desired format
    // if(count[index])
  }, [cartItems]);

  // const transformedPayload = Product.map((category) => ({
  //   items: category.items.map((item) => ({
  //     menuitemID: item.item_id,
  //     name: item.item_name,
  //     price: item.item_price,
  //     quantity: 1, // You can set the default quantity here
  //     kitchenID: item.kitchen_id,
  //     categoryID: category.subcategory_id,
  //     note: "", // You can set a default note here
  //   })),
  // }));
  // console.log(transformedPayload);
  useEffect(() => {
    // const updatedPayload = Product.map((category, index) => ({
    //   items: category.items.map((item) => ({
    //     menuitemID: item.item_id,
    //     name: item.item_name,
    //     price: item.item_price,
    //     quantity: counts[index], // Use counts based on the category index
    //     kitchenID: item.kitchen_id,
    //     categoryID: category.subcategory_id,
    //     note: "", // You can set a default note here
    //   })),
    // }));
    const updatedPayload = Product.reduce((accumulator, category, index) => {
      const categoryItems = category.items.map((item) => ({
        menuitemID: item.item_id,
        name: item.item_name,
        price: item.item_price,
        quantity: counts[index], // Use counts based on the category index
        kitchenID: item.kitchen_id,
        categoryID: category.subcategory_id,
        note: "", // You can set a default note here
      }));

      return [...accumulator, ...categoryItems];
    }, []);

    setUpdatedPayload(updatedPayload);
    console.log(JSON.stringify(UpdatedPayload));
    // setProduct(updatedPayload);
  }, [counts, cartItems]);

  useEffect(() => {
    const updatedTotalPrices = Product.map((subcategory, index) =>
      subcategory.items.reduce(
        (sum, item) => sum + item.item_price * counts[index],
        0
      )
    );
    setTotalPrices(updatedTotalPrices);
  }, [counts, Product]);

  // Calculate total payable amount
  useEffect(() => {
    const total = totalPrices.reduce((sum, price) => sum + price, 0);
    setTotalAmount(total);
  }, [totalPrices]);
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

                {Product.map((subcategory, index) => (
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
                                onClick={() => decrementCount(index)}
                                size="sm"
                              >
                                -
                              </Button>
                              {counts[index]}
                              <Button
                                color="green"
                                className="px-3 py-0 text-xl"
                                onClick={() => incrementCount(index)}
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
                              {parseFloat(
                                item.item_price * counts[index]
                              ).toFixed(2)}
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
        <CartSummary items={UpdatedPayload} totalAmount={totalAmount} />
      </div>
    </div>
  );
};

export default Cart;
