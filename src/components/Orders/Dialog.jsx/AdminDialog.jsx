import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
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
  });
  console.log(CommingOrderData);
  // Calculate total price
  const markAsPaid = async (order) => {
    axios
      .patch(
        `https://albadwan.shop/api/posorders/${CommingOrderData.PosOrderID}/paid`
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
  };
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
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full ">
            {/* <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    ${CommingOrderData.totalPrice}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Tax</p>
                  <p className="text-base leading-4 text-gray-600">
                    $
                    {CommingOrderData.total_amount -
                      CommingOrderData.totalPrice}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ${CommingOrderData.total_amount}
                </p>
              </div>
            </div> */}
            {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Shipping
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div class="w-8 h-8">
                    <img
                      class="w-full h-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-lg leading-6 font-semibold text-gray-800">
                      DPD Delivery
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold leading-6 text-gray-800">
                  $8.00
                </p>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                  View Carrier Details
                </button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="space-y-4 w-80 ">
          <div className="bg-gray-50 flex justify-between items-start max-h-56 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Summary
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="">
                <div className="pt-10 space-y-6">
                  <div className="flex justify-between">
                    <p className="text-base leading-4  text-blue-800">
                      Sub Total
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ${CommingOrderData.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">Tax</p>
                    <p className="text-base leading-4 text-gray-600">
                      $
                      {CommingOrderData.total_amount -
                        CommingOrderData.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base leading-4 text-blue-800">
                      Total Cost
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      ${CommingOrderData.total_amount}
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
          <div className="bg-gray-50 flex justify-between items-start max-h-56 p-4 flex-col rounded-lg">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Order Status
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="">
                <div className="pt-10 space-y-6">
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
                  <Button onClick={markAsPaid} className="w-full bg-green-600">
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
