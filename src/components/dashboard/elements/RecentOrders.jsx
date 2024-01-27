import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../lib/helpers/index";
import { useEffect, useState } from "react";
import { Button, CardFooter, IconButton } from "@material-tailwind/react";

export default function RecentOrders() {
  const [ordersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Set the number of items to display per page

  // useEffect(() => {
  //   const fetchOrdersData = async () => {
  //     try {
  //       // const res = await fetch(`https://albadwan.shop/api/duplicate`);
  //       const res = await fetch(`https://albadwan.shop/api/posorders`);
  //       const data = await res.json();
  //       setOrdersData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchOrdersData();
  // }, []);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `https://albadwan.shop/api/order/res/${restaurantId}`,
          { headers: headers }
        );
        const data = await res.json();

        // Sort orders by PosOrderID in descending order
        const sortedOrders = data.sort((a, b) => b.OrderID - a.OrderID);

        setOrdersData(sortedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrdersData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersData.slice(indexOfFirstItem, indexOfLastItem);

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

  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  return (
    <div className=" bg-white shadow-md px-4 pt-3 pb-4 rounded-xl border border-gray-200 flex-1">
      <strong className="text-gray-800 text-lg font-medium">
        Recent Orders
      </strong>
      <div className=" border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Items</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Order Total</th>
              <th>TX-ID</th>
              <th>Tx-Type</th>
              <th>Waiter</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td className="flex">
                  {order.items.map((item) => (
                    <div className="" key={item.MenuItemID}>
                      {item.ItemName.length > 10
                        ? `${item.ItemName.substring(0, 10)}...`
                        : item.ItemName}
                    </div>
                  ))}
                </td>
                <td>{convertToLocaleDate(order.time)}</td>
                <td>{convertToLocaleTime(order.time)}</td>
                <td>{order.total_amount}</td>
                <td>{order.tid}</td>
                <td>{order.paid_via}</td>
                <td>{order.waiter_id}</td>
                <td>{getOrderStatus(order.order_status)}</td>
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
              { length: Math.ceil(ordersData.length / itemsPerPage) },
              (_, index) => {
                if (
                  index < 5 || // Show the first 5 pages
                  index >= Math.ceil(ordersData.length / itemsPerPage) - 5 || // Show the last 5 pages
                  (currentPage - 3 <= index && index <= currentPage + 1) || // Show 3 pages before and 1 page after the current page
                  (index === 0 && currentPage <= 4) || // Always show the first page
                  (index === Math.ceil(ordersData.length / itemsPerPage) - 1 &&
                    currentPage >=
                      Math.ceil(ordersData.length / itemsPerPage) - 5) // Always show the last page
                ) {
                  return (
                    <IconButton
                      key={index}
                      variant={currentPage === index + 1 ? "outlined" : "text"}
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
            disabled={indexOfLastItem >= ordersData.length}
          >
            Next
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
