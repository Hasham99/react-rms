import { getOrderStatus } from "../lib/helpers/index";
import StaffDialog from "./Dialog.jsx/StaffDialog";
import React, { useEffect, useState } from "react";
import {
  Button,
  CardFooter,
  Dialog,
  DialogBody,
  IconButton,
  Input,
  Spinner,
} from "@material-tailwind/react";

const StaffOrders = () => {
  const [ordersData, setOrdersData] = useState([]);

  const [OrderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `https://albadwan.shop/api/order/res/${restaurantId}`,
          {
            headers: headers,
          }
        );
        const data = await res.json();
        // Sort orders by PosOrderID in descending order
        const sortedOrders = data.sort((a, b) => b.OrderID - a.OrderID);
        setOrdersData(sortedOrders);
        // if (sortedOrders) {
        //   localStorage.setItem("staff-orders", JSON.stringify(sortedOrders));
        // }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    // setOrdersData(JSON.parse(localStorage.getItem("staff-orders")));
    fetchOrdersData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter orders based on search term (order items, transaction ID, or transaction type)
  const filteredOrders = ordersData.filter((order) => {
    const includesOrderItem = order.items.some((item) =>
      item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const includesTransactionId = order.tid
      ? order.tid.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const includesTransactionType = order.paid_via
      ? order.paid_via.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    return (
      includesOrderItem || includesTransactionId || includesTransactionType
    );
  });

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
  const markAsPaid = (order) => {
    console.log(order);
  };
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);
  const handleClose = () => setSize(null);
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner color="indigo" />
      </div>
    );
  }
  return (
    <>
      <div className=" bg-white shadow-md px-4 pt-3 pb-4 rounded-xl border border-gray-200 flex-1">
        <div className="grid grid-cols-6">
          <div className="col-span-4 flex items-center">
            <strong className="text-gray-800 text-lg font-medium">
              Waiter Orders
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
                <th>Waiter Id</th>
                <th>TX-ID</th>
                <th>TX-Type</th>
                <th>Order Status</th>
                <th>Bill Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr
                  key={order.OrderID}
                  className="cursor-pointer"
                  onClick={() => {
                    markAsPaid(order);
                    setOrderData(order);
                    handleOpen("xl");
                  }}
                >
                  <td className="p-2 ">{order.series}</td>
                  <td className="p-2 flex">
                    {order.items.map((item) => (
                      <div className="" key={item.MenuItemID}>
                        {item.ItemName.length > 7
                          ? `${item.ItemName.substring(0, 5)}..`
                          : item.ItemName}
                      </div>
                    ))}
                  </td>
                  <td className="p-2">{convertToLocaleDate(order.time)}</td>
                  <td className="p-2">{convertToLocaleTime(order.time)}</td>
                  <td className="p-2">{order.total_amount}</td>
                  {/* <td>{getOrderStatus(order.waiter_id)}</td> */}
                  <td className="p-2">{order.waiter_id}</td>
                  <td className="p-2">{order.tid}</td>
                  <td className="p-2">{order.paid_via}</td>
                  <td className="p-2">{getOrderStatus(order.order_status)}</td>
                  <td className="px-2 py-1">
                    {getOrderStatus(order.bill_status)}
                  </td>
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
        <DialogBody className="p-0 m-0">
          <StaffDialog onClose={handleClose} orderData={OrderData} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default StaffOrders;
