import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu, Popover } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { FaCashRegister } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import jsPDF from "jspdf";

import Swal from "sweetalert2";
// import axios from "axios";
// import PDFDocument from "pdfkit";

const Header = () => {
  // const handleOpenCashDrawer = () => {
  //   const doc = new PDFDocument();
  //   doc.addDottedLine(50, 50, 550, 50, 5); // Add a single dotted line
  //   // Create a buffer to store PDF data
  //   const buffers = [];
  //   doc.on("data", buffers.push.bind(buffers));
  //   doc.on("end", () => {
  //     // Combine buffers into a single buffer
  //     const pdfData = Buffer.concat(buffers);
  //     // Create a blob from the PDF data
  //     const blob = new Blob([pdfData], { type: "application/pdf" });
  //     // Create a URL for the blob
  //     const url = window.URL.createObjectURL(blob);
  //     // Create an <a> element to trigger the download
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "cash_drawer_receipt.pdf";
  //     // Programmatically click on the link to trigger the download
  //     a.click();
  //     // Cleanup
  //     window.URL.revokeObjectURL(url);
  //   });
  // Serialize the PDF document
  //   doc.end();
  // };
  const handleOpenCashDrawer = () => {
    const doc = new jsPDF();
    doc.setDrawColor(0); // Set color to black
    doc.setLineDash([5]); // Set line dash style (5 pixels on, 5 pixels off)
    doc.line(50, 50, 550, 50); // Draw a line with dashed style
    doc.save("111.pdf"); // Save the PDF
    setTimeout(() => {
      Swal.fire({
        // title: "Alert",
        text: `Cash Drawer Opened! `,
        icon: "success",
        confirmButtonColor: "#43A047",
      });
    }, 2000);
  };
  // const handleOpenCashDrawer = async () => {
  //   const headers = {
  //     Authorization: `${BearerToken}`,
  //     "Content-Type": "application/json",
  //   };
  //   await axios
  //     .get(`https://albadwan.shop/api/coc/res/${restaurantId}/cashdrawer`, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       if (response.data.status == 200) {
  //         alert(JSON.stringify(response.data.message));
  //       } else {
  //         console.error("Failed to open cash drawer");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Network error:", error);
  //     });
  // };
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.length);
  const handleLogout = () => {
    // Clear local storage data
    localStorage.clear();

    window.location.href = "/";
  };
  const BearerToken = localStorage.getItem("BearerToken");
  const restaurantId = localStorage.getItem("restaurant_id");
  return (
    <div className="  bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
      <div className="relative">
        {/* <FaCashRegister
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        /> */}
        {/* <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        /> */}
        {/* <Button>Open Cash Drawer</Button> */}
        {/* <IconButton variant="outlined">
          <FaCashRegister fontSize={20} className="text-gray-500 " />
        </IconButton> */}
        <Button
          onClick={handleOpenCashDrawer}
          variant="filled"
          className="flex gap-2 items-center py-2 px-3 text-green-600 bg-green-100/60"
        >
          <FaCashRegister fontSize={20} className=" " />
          Open Cash Drawer
        </Button>
      </div>
      <div className="flex items-center gap-2 mr-2">
        {/* {cartItems > 0 && (
          <Popover className="flex justify-between ">
            <Link to={"/cart"}>
              <div className="flex items-start">
                <HiOutlineShoppingCart
                  className="text-gray-700"
                  fontSize={24}
                />
                <span className="text-white bg-green-500 rounded-full text-[12px]  px-1">
                  {cartItems}
                </span>
              </div>
            </Link>
          </Popover>
        )} */}

        {/* <Popover className="flex justify-between ">
          <Link to={"/cart"}>
            <span className="flex items-start cursor-pointer">
              <FaCashRegister
                className="text-gray-700"
                fontSize={24}
                onClick={() => setCartDialogOpen(true)}
              />
              <span className="text-white bg-green-500 rounded-full text-[12px]  px-1">
                {cartItems == 0 ? "" : cartItems}
              </span>
            </span>
          </Link>
        </Popover> */}
        <Popover className="flex justify-between ">
          <Link to={"/cart"}>
            <span className="flex items-start cursor-pointer">
              <HiOutlineShoppingCart
                className="text-gray-700"
                fontSize={24}
                onClick={() => setCartDialogOpen(true)}
              />
              <span className="text-white bg-green-500 rounded-full text-[12px]  px-1">
                {cartItems == 0 ? "" : cartItems}
              </span>
            </span>
          </Link>
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-50 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is messages panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-50 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is notification panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 bg-gray-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10  rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                // style={{
                //   backgroundImage:
                //     'url("https://source.unsplash.com/80x80?face")',
                // }}

                style={{
                  backgroundImage:
                    'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")',
                }}
              >
                <span className="sr-only">Marc Backes</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className=" origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={handleLogout}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
export default Header;
