import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartItems = () => {
  const [counts, setCounts] = useState([]); // Array to store counts for each item
  const [totalPrices, setTotalPrices] = useState([]); // Array to store total prices for each item
  const [totalAmount, setTotalAmount] = useState(0); // Total payable amount

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
  }, [cartItems]);

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
                        {parseFloat(item.item_price * counts[index]).toFixed(2)}
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
  );
};

export default CartItems;
