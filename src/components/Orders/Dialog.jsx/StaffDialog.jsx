import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import axios from "axios";

const StaffDialog = ({ onClose, orderData }) => {
  const {
    OrderID,
    bill_status,
    items,
    order_status,
    waiter_id,
    time,
    total_amount,
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

  const totalPrice = items.reduce(
    (acc, item) => acc + item.Quantity * item.Price,
    0
  );

  const [staffOrderData, setStaffOrderData] = useState({
    OrderID,
    bill_status,
    items,
    order_status,
    waiter_id,
    time: formattedTimeString,
    total_amount,
    totalPrice,
  });

  const markAsPaid = async (order) => {
    try {
      const response = await axios.patch(
        `https://albadwan.shop/api/order/${staffOrderData.OrderID}/paid`
      );
      console.log("PATCH request successful", response.data);
      window.location.reload(true);
    } catch (error) {
      console.error("Error making PATCH request", error);
    }
  };

  return (
    <div className="py-4 px-6  overflow-y-scroll">
      <div className="flex justify-between">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-2xl font-semibold leading-7 text-gray-800">
            Order
            <span className="text-red-500"> #{staffOrderData.OrderID}</span>
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {staffOrderData.time}
          </p>
        </div>
        <div onClick={onClose}>
          <FaRegWindowClose className="cursor-pointer h-6 w-6 text-red-500" />
        </div>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full space-x-4 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-3">
          <div className="flex flex-col justify-start items-start rounded-md bg-gray-50 px-4 py-4 h-full w-full">
            <p className="py-4 text-2xl font-semibold leading-6 xl:leading-5 text-green-600">
              Customer’s Cart
            </p>
            {staffOrderData.items.map((orderItem, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-start items-start  md:space-x-6 xl:space-x-8 w-full "
              >
                <div className="border-b border-gray-400 flex-row flex justify-between items-start w-full  py-6 ">
                  <div className="w-full flex flex-col justify-start items-start ">
                    <h3 className=" text-base font-semibold  text-gray-700">
                      {orderItem.ItemName}
                    </h3>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                      ${orderItem.Price.toFixed(2)}
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      {orderItem.Quantity}
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      ${(orderItem.Quantity * orderItem.Price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full">
            {/* Summary and Shipping details */}
          </div>
        </div>
        <div className="space-y-4 w-80 ">
          <div className="bg-gray-50 flex justify-between items-start max-h-56 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Summary
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="">
                <div className="pt-10 space-y-6">
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Sub Total
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ${staffOrderData.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">Tax</p>
                    <p className="text-base leading-4 text-gray-600">
                      ${staffOrderData.total_amount - staffOrderData.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Total Cost
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ${staffOrderData.total_amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 flex justify-between items-start max-h-56 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Order Status
            </h3>
            <div className="flex flex-col justify-start items-stretch h-full w-full">
              <div className="">
                <div className="pt-10 space-y-6">
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Bill Status
                    </p>
                    <p
                      className={`text-base leading-4 ${
                        staffOrderData.bill_status === "printed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {staffOrderData.bill_status}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Order Status
                    </p>
                    <p
                      className={`text-base leading-4 ${
                        staffOrderData.order_status === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {staffOrderData.order_status}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Transaction Type
                    </p>
                    <p className={`text-base leading-4 `}>Cash</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Transaction ID
                    </p>
                    <p className={`text-base leading-4 `}>XXXXXXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="bg-gray-50 flex justify-between items-start max-h-56 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Actions
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="">
                <div className="pt-10 space-y-6">
                  <Button
                    color="blue"
                    buttonType="filled"
                    size="lg"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={() => markAsPaid(staffOrderData)}
                  >
                    Mark as Paid
                  </Button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StaffDialog;
