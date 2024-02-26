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
import jsPDF from "jspdf";

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
          `${import.meta.env.VITE_API_KEY}/api/order/res/${restaurantId}`,
          {
            headers: headers,
          }
        );
        const data = await res.json();
        // Sort orders by PosOrderID in descending order
        const sortedOrders = data.sort((a, b) => b.OrderID - a.OrderID);
        setOrdersData(sortedOrders);
        console.log(sortedOrders);
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
  // const generatePDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // Add content to the PDF
  //   doc.setFontSize(12);
  //   doc.text("Staff Orders", 105, 20, { align: "center" });
  //   doc.setFontSize(10);
  //   doc.text(`Generated at: ${new Date().toLocaleString()}`, 105, 30, {
  //     align: "center",
  //   });

  //   // Table headers
  //   const headers = [
  //     "Order ID",
  //     "Order Date",
  //     "Order Time",
  //     "Order Total",
  //     "Waiter ID",
  //     "TX-ID",
  //     "TX-Type",
  //   ];

  //   // Positioning variables
  //   let yPos = 40; // Initial y position of the table
  //   const startX = 10; // X position of the first column

  //   // Add headers to the table
  //   headers.forEach((header, index) => {
  //     doc.text(header, startX + index * 40, yPos);
  //   });

  //   // Table data
  //   ordersData.forEach((order, rowIndex) => {
  //     yPos += 8; // Move to the next row
  //     doc.text(String(order.OrderID), startX, yPos);
  //     doc.text(convertToLocaleDate(order.time), startX + 40, yPos);
  //     doc.text(convertToLocaleTime(order.time), startX + 80, yPos);
  //     doc.text(String(order.total_amount), startX + 120, yPos);
  //     doc.text(String(order.waiter_id), startX + 160, yPos);
  //     doc.text(String(order.tid), startX + 200, yPos);
  //     doc.text(String(order.paid_via), startX + 240, yPos);
  //   });

  //   // Save the PDF
  //   doc.save("staff_orders.pdf");
  // };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add content to the PDF
    doc.setFontSize(12);
    doc.text("Staff Orders", 105, 10, { align: "center" });
    doc.setFontSize(10);

    const generatedAtText = `Generated at: ${new Date().toLocaleString()}`;
    doc.text(generatedAtText, 105, 18, { align: "center" });

    // Draw dotted line after generated time
    const startX = 20; // X position to start the dotted line
    const endX =
      startX +
      doc.getStringUnitWidth(generatedAtText) * doc.internal.getFontSize(); // X position to end the dotted line
    const lineY = 23; // Y position for the dotted line
    const lineWidth = 0.2; // Width of the dotted line
    const dotSpacing = 2; // Space between dots
    const dotLength = 1; // Length of each dot

    doc.setLineWidth(lineWidth);
    for (let x = startX; x <= endX; x += dotSpacing) {
      doc.line(x, lineY, x + dotLength, lineY);
    }

    // Table headers
    const headers = [
      "Order Date",
      "Order Time",
      "Order ID",
      "Waiter Name",
      "Transaction Id",
      "Paid Via",
      "Order Total",
    ];

    // Filter orders from the previous 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);
    const filteredOrders = currentItems.filter(
      (order) => new Date(order.time) >= sevenDaysAgo
    );

    // Positioning variables
    let yPos = 40; // Initial y position of the table
    const startXTable = 8; // X position of the first column

    // Add headers to the table
    headers.forEach((header, index) => {
      doc.text(header, startXTable + index * 30, yPos);
    });

    // Table data
    filteredOrders.forEach((order, rowIndex) => {
      yPos += 8; // Move to the next row
      doc.text(convertToLocaleDate(order.time), startXTable, yPos);
      doc.text(convertToLocaleTime(order.time), startXTable + 30, yPos);
      doc.text(String(order.OrderID), startXTable + 60, yPos);
      doc.text(String(order.waiter_name), startXTable + 90, yPos);
      doc.setFontSize(8);
      doc.text(String(order.tid), startXTable + 120, yPos);
      doc.setFontSize(10);
      doc.text(String(order.paid_via.toUpperCase()), startXTable + 150, yPos);
      doc.text(String(order.total_amount), startXTable + 180, yPos);
    });

    // Thank you message and organization details
    const thankYouMessage = "THANK YOU";
    const organizationDetails = "software by: Anunzio International";
    const website = "www.anunziointernational.com";
    const contactNumber = "+971-58-551-5742";
    const email = "info@anunziointernational.com";

    const pageHeight = doc.internal.pageSize.height;
    const bottomMargin = 25;

    doc.text(thankYouMessage, 105, pageHeight - bottomMargin, {
      align: "center",
    });
    doc.text(organizationDetails, 105, pageHeight - bottomMargin + 5, {
      align: "center",
    });
    doc.text(website, 105, pageHeight - bottomMargin + 10, { align: "center" });
    doc.text(contactNumber, 105, pageHeight - bottomMargin + 15, {
      align: "center",
    });
    doc.text(email, 105, pageHeight - bottomMargin + 20, {
      align: "center",
    });

    // Save the PDF
    doc.save("staff_orders_last_30_days.pdf");
  };

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
          <div className="col-span-4 flex justify-between items-center">
            <strong className="text-gray-800 text-lg font-medium">
              Waiter Orders
            </strong>
            <Button
              onClick={generatePDF}
              className="mx-4 outline-1 outline shadow-none bg-transparent text-black"
            >
              Generate PDF
            </Button>
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
