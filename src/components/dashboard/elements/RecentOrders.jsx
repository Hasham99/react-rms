import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../lib/helpers/index";
import { useEffect, useState } from "react";

export default function RecentOrders() {
  const [ordersData, setOrdersData] = useState([]);
  // const [refreshData, setRefreshData] = useState(false);
  // const refreshLocalStorageData = () => {
  // You can replace 'your-local-storage-key' with your specific key

  // setRefreshData(false); // Reset the refresh flag
  // };
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const res = await fetch(`http://54.196.226.78:3000/api/order`);
        // const res = await fetch(`${import.meta.env.VITE_API_KEY}/api/order`);
        const data = await res.json();
        // localStorage.setItem("orders", JSON.stringify(data));
        setOrdersData(data);
      } catch (error) {
        console.log(error);
      }
    };
    // const localData = () => {
    // const dataFromLocalStorage = JSON.parse(localStorage.getItem("orders"));

    // if (dataFromLocalStorage) {
    // }
    // };
    fetchOrdersData();
    // localData();
    // setRefreshData(false);
  }, []);

  // Function to convert a UTC timestamp to local time
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

  return (
    <div className="bg-white shadow-md px-4 pt-3 pb-4 rounded-xl border border-gray-200 flex-1">
      <strong className="text-gray-800 text-lg font-medium">
        Recent Orders
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Items</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Order Total</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td className="flex ">
                  {order.items.map((item) => (
                    <div
                      className=""
                      key={item.MenuItemID}
                    >{`${item.ItemName}, ${item.ItemName}, ${item.ItemName}, ${item.ItemName}`}</div>
                  ))}
                </td>
                <td>{convertToLocaleDate(order.time)}</td>
                <td>{convertToLocaleTime(order.time)}</td>
                {/* <td>{order.time}</td> */}
                <td>{order.total_amount}</td>
                {/* <td>{order.status}</td> */}
                <td>{getOrderStatus(order.order_status)}</td>
                {/* <td>
                  order.total_amount
                </td>
                <td>
                  order.total_amount
                </td>
                <td>
                  order.total_amount
                </td> */}
                {/* <td>
                  <Link to={`/customer/${order.customer_id}`}>
                    {order.customer_name}
                  </Link>
                </td>
                <td>{format(new Date(order.order_date), "dd MMM yyyy")}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{getOrderStatus(order.current_order_status)}</td> */}
              </tr>
            ))}

            {/* {ordersData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/${order.id}`}>#{order.id}</Link>
                </td>
                <td>
                  <Link to={`/product/${order.product_id}`}>
                    #{order.product_id}
                  </Link>
                </td>
                <td>
                  <Link to={`/customer/${order.customer_id}`}>
                    {order.customer_name}
                  </Link>
                </td>
                <td>{format(new Date(order.order_date), "dd MMM yyyy")}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
