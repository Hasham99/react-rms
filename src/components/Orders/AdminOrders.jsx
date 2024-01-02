import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../lib/helpers/index";
import { useEffect, useState } from "react";
import {
  Button,
  CardFooter,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import axios from "axios";
import AdminDialog from "./Dialog.jsx/AdminDialog";
const AdminOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order data
  const [itemsPerPage, setItemsPerPage] = useState(25); // Step 1: Set default itemsPerPage
  const [searchTerm, setSearchTerm] = useState("");
  const [OrderData, setOrderData] = useState([]);
  // const itemsPerPage = 25; // Set the number of items to display per page

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const res = await fetch(`https://albadwan.shop/api/posorders`);
        const data = await res.json();
        // Sort orders by PosOrderID in descending order
        const sortedOrders = data.sort((a, b) => b.PosOrderID - a.PosOrderID);
        setOrdersData(sortedOrders);
        // if (sortedOrders) {
        //   localStorage.setItem("admin-orders", JSON.stringify(sortedOrders));
        // }
      } catch (error) {
        console.log(error);
      }
    };
    // setOrdersData(JSON.parse(localStorage.getItem("admin-orders")));
    fetchOrdersData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Filter orders based on search term
  const filteredOrders = ordersData.filter((order) =>
    order.order_items.some((item) =>
      item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Function to convert a UTC timestamp to local date
  const convertToLocaleDate = (utcTimestamp) => {
    const localDate = new Date(utcTimestamp).toLocaleDateString();
    return localDate;
  };

  // Function to convert a UTC timestamp to local time
  const convertToLocaleTime = (utcTimestamp) => {
    const localTime = new Date(utcTimestamp).toLocaleTimeString();
    return localTime;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Function to handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Step 3: Reset the current page when items per page changes
  };
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => setOpen(!open);
  // const markAsPaid = async () => {

  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);
  const handleClose = () => setSize(null);
  return (
    <>
      <div className=" bg-white shadow-md px-4 pt-3 pb-4 rounded-xl border border-gray-200 flex-1">
        <div className="grid grid-cols-6">
          <div className="col-span-4 flex items-center ">
            <strong className="text-gray-800 text-lg font-medium">
              POS Orders
            </strong>
          </div>

          <Input
            label="Search Orders"
            className=""
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="col-span-1 flex items-center justify-end space-x-2">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              {[1, 2, 5, 10, 15, 20, 25, 50].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {/* <span>items per page</span> */}
          </div>
        </div>
        <div className=" border-x border-gray-200 rounded-sm mt-3">
          <table className="w-full text-gray-700">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Items</th>
                <th>Order Date</th>
                <th>Order Time</th>
                <th>Order Total</th>
                <th>Order Status</th>
                <th>Bill Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr
                  className="cursor-pointer"
                  key={order.PosOrderID}
                  onClick={() => {
                    // setOrderID(order.PosOrderID);
                    // markAsPaid(order);
                    setOrderData(order);
                    // handleOpen();
                    handleOpen("xl");
                  }}
                >
                  <td>{order.PosOrderID}</td>
                  <td className="flex">
                    {order.order_items.map((item) => (
                      <div className="" key={item.PosOrderItemID}>
                        {item.ItemName.length > 10
                          ? `${item.ItemName.substring(0, 10)}...`
                          : item.ItemName}
                      </div>
                    ))}
                  </td>
                  <td>{convertToLocaleDate(order.time)}</td>
                  <td>{convertToLocaleTime(order.time)}</td>
                  <td>{order.total_amount}</td>
                  <td>{getOrderStatus(order.order_status)}</td>
                  <td>{getOrderStatus(order.bill_status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.ceil(filteredOrders.length / itemsPerPage) },
                (_, index) => {
                  if (
                    index < 5 || // Show the first 5 pages
                    index >=
                      Math.ceil(filteredOrders.length / itemsPerPage) - 5 || // Show the last 5 pages
                    (currentPage - 3 <= index && index <= currentPage + 1) || // Show 3 pages before and 1 page after the current page
                    (index === 0 && currentPage <= 4) || // Always show the first page
                    (index ===
                      Math.ceil(filteredOrders.length / itemsPerPage) - 1 &&
                      currentPage >=
                        Math.ceil(filteredOrders.length / itemsPerPage) - 5) // Always show the last page
                  ) {
                    return (
                      <IconButton
                        key={index}
                        variant={
                          currentPage === index + 1 ? "outlined" : "text"
                        }
                        size="sm"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </IconButton>
                    );
                  } else if (index === 5) {
                    // Show (...) when skipping pages
                    return <span key={index}>...</span>;
                  }
                  return null;
                }
              )}
            </div>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= filteredOrders.length}
            >
              Next
            </Button>
          </CardFooter>
        </div>
      </div>
      {/* <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Order ID: {OrderID}</DialogHeader>
        <DialogBody>
          Would you like to mark Order: {OrderID}, as{" "}
          <strong className="text-green-600">PAID</strong>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={markAsPaid}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        {/* <DialogHeader>Its a simple dialog.</DialogHeader> */}
        <DialogBody className="p-0 m-0">
          <AdminDialog onClose={handleClose} orderData={OrderData} />
        </DialogBody>
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </>
  );
};

export default AdminOrders;
