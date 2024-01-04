import { Button, Select } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const AdminDialog = ({ onClose, orderData }) => {
  const {
    PosOrderID,
    bill_status,
    order_items,
    order_status,
    restaurant_id,
    time,
    total_amount,
    tid,
    paid_via,
  } = orderData;
  // Format the time
  const formattedTime = new Date(time);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedTimeString = formattedTime.toLocaleDateString(
    "en-US",
    options
  );
  const totalPrice = order_items.reduce(
    (acc, item) => acc + item.Quantity * item.Price,
    0
  );
  const [CommingOrderData, setCommingOrderData] = useState({
    PosOrderID,
    bill_status,
    order_items,
    order_status,
    restaurant_id,
    time: formattedTimeString,
    total_amount,
    totalPrice,
    tid,
    paid_via,
  });
  console.log(CommingOrderData);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [valuePay, setValuePay] = useState(selectedPayment);

  const [payment, setPayment] = useState([]);
  // Define a state variable to store the input value
  const [inputValue, setInputValue] = useState("");

  // Define a function to handle input changes
  const handleInputChange = (e) => {
    // Update the state with the new input value
    setInputValue(e.target.value);
  };

  const handlePaymentChange = (e) => {
    // Update the selectedPayment state
    setSelectedPayment(e.target.value);

    // Update the valuePay state
    setValuePay(e.target.value);
  };
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          "https://albadwan.shop/api/payment/res/1/get"
        );
        const data = await response.json();
        setPayment(data);
        console.log(JSON.stringify(payment));
        // console.log(JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };
    fetchPayment();
  }, []);

  // Calculate total price
  const markAsPaid = async () => {
    if (valuePay) {
      axios
        .patch(
          `https://albadwan.shop/api/posorders/${CommingOrderData.PosOrderID}/paid/${inputValue}/${valuePay}`
        )
        .then((response) => {
          console.log("PATCH request successful", response.data);
          // setOpen(!open);
          window.location.reload(true);
          // Handle the response data here if needed
        })
        .catch((error) => {
          console.error("Error making PATCH request", error);
          // Handle errors here if needed
        });
    } else {
      alert("Transaction type can't be empty ");
    }
  };
  const isOrderPaid = CommingOrderData.order_status === "paid";
  const currency = localStorage.getItem("currency");
  return (
    <div className="py-4 px-6  overflow-y-scroll">
      {/* <div className=""> */}
      <div className="flex justify-between">
        <div className="flex justify-start item-start space-y-2 flex-col ">
          <h1 className="text-2xl  font-semibold leading-7   text-gray-800">
            Order
            <span className="text-red-500">
              {" "}
              #{CommingOrderData.PosOrderID}
            </span>
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {/* 21st Mart 2021 at 10:34 PM */}
            {CommingOrderData.time}
          </p>
        </div>
        <div onClick={onClose}>
          <FaRegWindowClose className="cursor-pointer h-6 w-6 text-red-500" />
        </div>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full space-x-4 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-3">
          {/* <p className="text-xl  font-semibold leading-6  text-gray-800">
            Customer’s Cart
          </p> */}
          <div className=" flex flex-col justify-start items-start rounded-md bg-gray-50 px-4 py-4 h-full w-full">
            <p className="py-4 text-2xl font-semibold leading-6 xl:leading-5 text-green-600">
              Customer’s Cart
            </p>

            {CommingOrderData.order_items.map((orderItem, index) => (
              <div
                key={index}
                className="  flex flex-col md:flex-row justify-start items-start  md:space-x-6 xl:space-x-8 w-full "
              >
                <div className="border-b border-gray-400 flex-row flex justify-between items-start w-full  py-6 ">
                  <div className="w-full flex flex-col justify-start items-start ">
                    <h3 className=" text-base font-semibold  text-gray-700">
                      {orderItem.ItemName}
                    </h3>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                      {currency} {orderItem.Price.toFixed(2)}
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      {orderItem.Quantity}
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      {currency}{" "}
                      {(orderItem.Quantity * orderItem.Price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full "></div>
        </div>
        <div className="space-y-4 w-96 ">
          <div className="bg-gray-50 flex justify-between items-start max-h-56 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Summary
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="">
                <div className="pt-5 space-y-6">
                  <div className="flex justify-between">
                    <p className="text-base leading-4  text-blue-800">
                      Sub Total
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {currency} {CommingOrderData.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">Tax</p>
                    <p className="text-base leading-4 text-gray-600">
                      {currency}{" "}
                      {CommingOrderData.total_amount -
                        CommingOrderData.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Total Cost
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      {currency} {CommingOrderData.total_amount}
                    </p>
                  </div>
                </div>

                {/* <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <p className="cursor-pointer text-sm leading-5 text-gray-800">
                  david89@gmail.com
                </p>
              </div> */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 flex justify-between items-start max-h-80 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Order Status
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="">
                <div className="pt-5 space-y-6">
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Bill Status
                    </p>
                    <p
                      className={`text-base leading-4 ${
                        CommingOrderData.bill_status === "printed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {CommingOrderData.bill_status}
                    </p>
                  </div>
                  {/* <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">Tax</p>
                    <p className="text-base leading-4 text-gray-600">
                      ${CommingOrderData.totalPrice}
                    </p>
                  </div> */}
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Order Status
                    </p>
                    <p
                      className={`text-base leading-4 ${
                        CommingOrderData.order_status === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {CommingOrderData.order_status}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-base leading-4 text-blue-800">
                      Transaction Type
                    </p>
                    {isOrderPaid ? (
                      <p className="text-base leading-4">
                        {CommingOrderData.paid_via}
                      </p>
                    ) : (
                      <select
                        className="block w-20 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={valuePay}
                        onChange={handlePaymentChange}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {payment.map((payment) => (
                          <option key={payment.p_id} value={payment.name}>
                            {payment.p_name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Transaction ID
                    </p>
                    <p className={`text-base leading-4 `}>
                      {/* {CommingOrderData.tid} */}
                      {isOrderPaid ? (
                        <p className="text-base leading-4">
                          {CommingOrderData.tid}
                        </p>
                      ) : (
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInputChange}
                          className="block w-20 py-1 px-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      )}
                    </p>
                  </div>
                  <Button
                    onClick={markAsPaid}
                    className={`w-full bg-green-600 ${
                      isOrderPaid
                        ? "cursor-not-allowed opacity-50 bg-gray-600"
                        : ""
                    }`}
                    disabled={isOrderPaid}
                  >
                    Mark as Paid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDialog;
