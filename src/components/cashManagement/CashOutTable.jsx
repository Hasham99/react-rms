import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

const PAGE_SIZE = 10;

const CashOutTable = ({ type }) => {
  const [cashOutData, setCashOutData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCashAmount, setTotalCashAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_KEY
          }/api/coc/res/${restaurantId}/methodwise/cashout/get/${type}`,
          { headers: headers }
        );
        setCashOutData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total cash amount
    const sum = cashOutData
      .filter((item) => item.type === type) // Filter data by type
      .reduce((total, cashOutItem) => total + cashOutItem.amount, 0);
    setTotalCashAmount(sum);
  }, [cashOutData, type]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const totalPages = Math.ceil(cashOutData.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, cashOutData.length);
  const paginatedData = cashOutData
    .filter((item) => item.type === type) // Filter data by type
    .slice(startIndex, endIndex);

  const restaurantId = localStorage.getItem("restaurant_id");
  const currency = localStorage.getItem("currency");
  const BearerToken = localStorage.getItem("BearerToken");

  return (
    <Card className="h-fit w-full overflow-y-auto">
      <table className="rounded-xl w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            <th className="bg-red-100 p-4 text-gray-800">
              <Typography variant="small" className="font-bold leading-none">
                Narration
              </Typography>
            </th>
            <th className="bg-red-100 p-4 text-gray-800 text-center">
              <Typography variant="small" className="font-bold leading-none">
                Amount ({currency})
              </Typography>
            </th>
            <th className="bg-red-100 p-4 text-gray-800 text-end">
              <Typography variant="small" className="font-bold leading-none">
                Time
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((cashOutItem, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-red-100/20" : ""}>
              <td className="px-4 py-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {cashOutItem.narration}
                </Typography>
              </td>
              <td className="px-4 py-2 text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {cashOutItem.amount}
                </Typography>
              </td>
              <td className="px-4 py-2 text-end">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {formatTime(cashOutItem.time)}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 px-4 py-2">
        <Button
          variant="outlined"
          className="p-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(totalPages).keys()].map((page) => (
            <IconButton
              key={page + 1}
              variant={currentPage === page + 1 ? "outlined" : "text"}
              className="w-5 h-5"
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="outlined"
          className="p-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CashOutTable;
