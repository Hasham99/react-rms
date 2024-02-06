import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";

const CashOutTable = () => {
  const [cashOutData, setCashOutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://albadwan.shop/api/coc/res/${restaurantId}/cashout/get`
        ); // Replace 1 with your restaurant_id
        setCashOutData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const restaurantId = localStorage.getItem("restaurant_id");
  return (
    <Card className="h-fit w-full overflow-y-scroll">
      <table className="rounded-xl w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="bg-red-100 p-4 text-gray-800">
              <Typography variant="small" className="font-bold leading-none">
                Narration
              </Typography>
            </th>
            <th className="bg-red-100 p-4 text-gray-800">
              <Typography variant="small" className="font-bold leading-none">
                Amount
              </Typography>
            </th>
            <th className="bg-red-100 p-4 text-gray-800">
              <Typography variant="small" className="font-bold leading-none">
                Time
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {cashOutData.map((cashOutItem, index) => (
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
              <td className="px-4 py-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {cashOutItem.amount}
                </Typography>
              </td>
              <td className="px-4 py-2">
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
    </Card>
  );
};

export default CashOutTable;
