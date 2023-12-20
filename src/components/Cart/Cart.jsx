import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartPOS from "../POS/elements/CartPOS";
import CartItems from "./elements/CartItems";
import CartSummary from "./elements/CartSummary";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const Cart = () => {
  const [counts, setCounts] = useState([]); // Array to store counts for each item
  const [totalPrices, setTotalPrices] = useState([]); // Array to store total prices for each item
  const [totalAmount, setTotalAmount] = useState(0); // Total payable amount
  const [CategoryId, setCategoryId] = useState(null);
  const [KitchenId, setKitchenId] = useState(null);
  const [ItemName, setItemName] = useState(null);
  const [ItemPrice, setItemPrice] = useState(null);
  const [ItemId, setItemId] = useState(null);

  const [Product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);

  // Function to increment the count for a specific item
  const incrementCount = (index) => {
    const updatedCounts = [...counts];
    updatedCounts[index] += 1;
    setCounts(updatedCounts);
  };

  // Function to decrement the count for a specific item with a condition to keep it above 1
  const decrementCount = (index) => {
    if (counts[index] > 1) {
      const updatedCounts = [...counts];
      updatedCounts[index] -= 1;
      setCounts(updatedCounts);
    }
  };
  // console.log("product", Product);
  // console.log("count", counts);
  // console.log("totalPrices", totalPrices);
  // console.log("totalAmount", totalAmount);
  // console.log("product", Product);
  // console.log(counts);

  useEffect(() => {
    const initialCounts = cartItems.map(() => 1);
    setCounts(initialCounts);
    setProduct(cartItems);
    // const extractedValues = [];

    // // Loop through the API response and extract values
    // Product.forEach((subcategory) => {
    //   subcategory.items.forEach((item) => {
    //     extractedValues.push({
    //       subcategoryId: subcategory.subcategory_id,
    //       subcategoryName: subcategory.subcategory_name,
    //       itemId: item.item_id,
    //       itemName: item.item_name,
    //       itemPrice: item.item_price,
    //       kitchenId: item.kitchen_id,
    //       itemDescription: item.item_description,
    //     });
    //   });
    // });

    // console.log("ids", extractedValues);
  }, [cartItems]);

  useEffect(() => {
    // Extract all items' data and store it in the state variable
    // const extractedItems = Product.flatMap((subcategory) =>
    //   subcategory.items.map((item) => ({
    //     categoryId: subcategory.subcategory_id,
    //     // subcategoryName: subcategory.subcategory_name,
    //     itemId: item.item_id,
    //     itemName: item.item_name,
    //     itemPrice: item.item_price,
    //     kitchenId: item.kitchen_id,
    //   }))
    // );
    const extractedItems = Product.flatMap((subcategory) =>
      subcategory.items.map((item) => ({
        // subcategoryName: subcategory.subcategory_name,
        itemId: item.item_id,
        itemName: item.item_name,
        itemPrice: item.item_price,

        kitchenId: item.kitchen_id,
      }))
    );
    // console.log("item", JSON.stringify(extractedItems));

    const itemId = extractedItems.map((item) => item.itemId);
    const itemNames = extractedItems.map((item) => item.itemName);
    const itemPrice = extractedItems.map((item) => item.itemPrice);
    const kitchenId = extractedItems.map((item) => item.kitchenId);

    setItemId(itemId);
    setItemName(itemNames);
    setItemPrice(itemPrice);
    setKitchenId(kitchenId);

    const extractedSubCategoryIds = Product.map(
      (subcategory) => subcategory.subcategory_id
    );
    setCategoryId(extractedSubCategoryIds);

    // const category_id = Product.flatMap((subcategory) =>
    //   subcategory.items.map((item) => ({
    //     categoryId: subcategory.subcategory_id,
    //   }))
    // );
    // console.log("extracted", JSON.stringify(extractedItems));
    //  setItemsData(extractedItems);

    // const extractedSubCategoryIds = Product.map(
    //   (subcategory) => subcategory.subcategory_id
    // );
    // const extractedSubCategoryIds = Product.map(
    //   (subcategory) => subcategory.subcategory_id
    // );
    // const extractedSubCategoryIds = Product.map(
    //   (subcategory) => subcategory.subcategory_id
    // );
    // const extractedSubCategoryIds = Product.map(
    //   (subcategory) => subcategory.subcategory_id
    // );
    // const extractedSubCategoryIds = Product.map(
    //   (subcategory) => subcategory.subcategory_id
    // );
    // const extractedSubCategoryIds = Product.map(
    //   (subcategory) => subcategory.subcategory_id
    // );

    console.log(JSON.stringify(extractedSubCategoryIds));
  }, []);
  // Update total prices whenever counts change
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
        <CartSummary
          totalAmount={totalAmount}
          categoryId={CategoryId}
          kitchenId={KitchenId}
          itemPrice={ItemPrice}
          itemName={ItemName}
          itemId={ItemId}
        />
      </div>
    </div>
  );
};

export default Cart;
