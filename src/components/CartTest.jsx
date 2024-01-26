import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { remove, clearAll } from "../redux/CartSlice"; //path to your cart slice
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartTest = () => {
  const [totalAmount, setTotalAmount] = useState(0); // Total payable amount
  const [Product, setProduct] = useState([]);
  const cartItems = useSelector((state) => state.cart);
  const cartItemsCount = useSelector((state) => state.cart.length);
  const [tax, setTax] = useState(null);
  // const [TotalExtrasPrice, setTotalExtrasPrice] = useState(0);

  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleRemove = (index) => {
    dispatch(remove(index));
  };
  const handleClearAll = () => {
    dispatch(clearAll());
  };
  useEffect(() => {
    console.log("cart", cartItems);
    setProduct(cartItems);
    // Calculate the total cost for all items in the cart
    const totalCostForAllItems = cartItems.reduce((total, subcategory) => {
      const itemTotal =
        (parseFloat(subcategory.price) +
          subcategory.itemExtras.reduce(
            (extraTotal, extra) => extraTotal + extra.extras_price,
            0
          )) *
        subcategory.quantity;
      return total + itemTotal;
    }, 0);

    setTotalAmount(totalCostForAllItems);
  }, [cartItems]);

  // useEffect(() => {
  // const extrasPriceTotal = Product.reduce((total, item) => {
  //   if (item.itemExtras && item.itemExtras.length > 0) {
  //     const extrasTotal = item.itemExtras.reduce(
  //       (itemTotal, extra) => itemTotal + extra.extras_price,
  //       0
  //     );
  //     return total + extrasTotal;
  //   }
  //   return total;
  // }, 0);
  // const extrasPriceTotalNum = parseFloat(extrasPriceTotal);
  // setTotalExtrasPrice(extrasPriceTotalNum);
  // }, []);

  const amountAfterTax = parseFloat(
    totalAmount + (totalAmount * tax) / 100
  ).toFixed(4);

  // console.log(amountAfterTax);
  const jsonData = {
    // time: new Date().toLocaleString(),
    total_amount: amountAfterTax,
    items: Product.map((item) => ({
      categoryID: item.categoryID,
      menuitemID: item.menuitemID,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      kitchenID: item.kitchenID,
      extras: item.itemExtras.map((extra) => ({
        extras_id: extra.extras_id,
        // extras_name: extra.extras_name,
        // extras_price: extra.extras_price,
      })),
      note: item.note,
    })),
  };
  const navigate = useNavigate();
  const submitData = () => {
    const headers = {
      Authorization: `${BearerToken}`,
      "Content-Type": "application/json",
    };
    // Calculate total extras price and update state
    axios
      .post(`https://albadwan.shop/api/posorders/${restaurantId}`, jsonData, {
        headers,
      })
      // .post(`{currency}{import.meta.env.VITE_API_KEY}/api/posorders/1`, jsonData)
      .then(() => {
        // alert(JSON.stringify(jsonData));
        // window.location.href = "/admin-orders";
        dispatch(clearAll());
        navigate("/admin-orders");
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(jsonData);
  };
  useEffect(() => {
    // Fetch data from the API
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://albadwan.shop/api/timezones/res/1"
    //     );
    //     const data = response.data;

    //     // Extract values from the response and set them in state
    //     if (data && data.timezone && data.timezone.length > 0) {
    //       const timezoneData = data.timezone[0];
    //       setTax(timezoneData.tax);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
    setTax(localTax);
  }, []);
  const currency = localStorage.getItem("currency");
  const localTax = localStorage.getItem("tax");
  console.log(JSON.stringify(Product));
  const BearerToken = localStorage.getItem("BearerToken");
  const restaurantId = localStorage.getItem("restaurant_id");
  return (
    <div className="h-screen mx-auto ">
      <div className="flex shadow-md h-screen">
        <div className="w-3/4 bg-white px-10 py-10 overflow-y-scroll">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="flex flex-col font-semibold text-2xl">
              Items: {cartItemsCount}
              <Link
                onClick={handleClearAll}
                className="flex text-sm text-red-400 justify-end"
              >
                clear all
              </Link>
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 ">
              Extras
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price <span className="">({currency})</span>
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {Product.map((subcategory, index) => (
            <div
              key={subcategory.index}
              className="flex items-center bg-gray-100 hover:bg-gray-200 -mx-8 px-6 py-5 my-2"
            >
              <div className="flex w-2/5">
                {/* <div className="w-20">
                <img
                  className="h-24"
                  src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                  alt=""
                />
                </div> */}
                <div className="flex flex-col justify-between ml-4 flex-grow ">
                  <span className="font-bold text-sm">{subcategory.name}</span>
                  {/* <span className="text-red-500 text-xs">Apple</span> */}
                  <Link
                    onClick={() => handleRemove(index)}
                    className="py-2 font-semibold text-red-400 hover:text-red-700  text-xs"
                  >
                    Remove
                  </Link>
                </div>
              </div>
              <div className="flex flex-col  w-1/5">
                {subcategory.itemExtras.map((newItem, index) => (
                  <div
                    className=" font-semibold text-gray-500 py-[2px]  text-xs"
                    key={index}
                  >
                    {newItem.extras_name}
                  </div>
                ))}
              </div>
              <div className="flex justify-center w-1/5">
                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  defaultValue={subcategory.quantity}
                />
              </div>

              <span className="text-center w-1/5 font-semibold text-sm">
                {parseFloat(subcategory.price).toFixed(2)}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                {/* {(subcategory.price + 0) * subcategory.quantity} */}
                {(
                  (parseFloat(subcategory.price) +
                    subcategory.itemExtras.reduce(
                      (total, extra) => total + extra.extras_price,
                      0
                    )) *
                  subcategory.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between mt-10">
            <Link
              to={"/pos"}
              className="flex font-semibold text-indigo-600 text-sm"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Go Back
            </Link>
            <div className="items-end font-semibold text-gray-600 text-sm uppercase mr-10">
              <span className="">Sub Total:</span>
              <span className="font-bold text-green-300"> {currency} </span>
              <span className="font-bold text-green-600">
                {parseFloat(totalAmount).toFixed(2)}
              </span>
              {/* <span className="font-bold text-green-600">{totalCostForAllItems}</span> */}
            </div>
          </div>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items <span className="text-red-700"> {cartItemsCount}</span>
            </span>
            <span className="font-semibold text-sm">
              {currency} {parseFloat(totalAmount).toFixed(2)}
            </span>
          </div>
          {/* <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - {currency}10.00</option>
            </select>
          </div> */}
          <div className="flex justify-between my-10 items-end">
            <label
              htmlFor="promo"
              className="font-semibold inline-block my-auto text-sm uppercase"
            >
              Tax
            </label>
            <input
              disabled
              id="promo"
              placeholder="%"
              className="bg-white p-1 text-sm w-10"
              // value={discountPercentage}
              value={`${tax} %`}
              // onChange={handleDiscountChange}
            />
          </div>
          <div className="border-t ">
            <div className="flex font-semibold justify-between  text-sm uppercase">
              <span>Total cost</span>
              <span>
                {currency}{" "}
                {/* {parseFloat(
                  totalAmount - (totalAmount * discountPercentage) / 100
                ).toFixed(2)} */}
                {/* {parseFloat(amountAfterTax).toFixed(2)} */}
                {/* {parseFloat(totalAmount + parseFloat(tax)).toFixed(2)} */}
                {parseFloat(amountAfterTax).toFixed(2)}
              </span>
            </div>
            <button
              onClick={submitData}
              className="bg-indigo-500 my-10 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTest;
