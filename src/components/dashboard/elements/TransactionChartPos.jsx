import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const fillMissingMonths = (data) => {
  const monthSet = new Set(data.map((entry) => entry.name));
  const missingMonths = MONTHS.filter((month) => !monthSet.has(month));

  return data.concat(
    missingMonths.map((month) => ({
      name: month,
      Expense: 0,
      Income: 0,
    }))
  );
};

export default function TransactionChartPos(props) {
  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          // `${props.url}`
          `https://albadwan.shop/api/expense/res/${restaurantId}/pos/monthly`,
          { headers: headers }
        );

        if (!response.data || response.data.length === 0) {
          setChartData([]);
          return;
        }

        const filledData = fillMissingMonths(response.data);
        const sortedData = filledData.sort(
          (a, b) => MONTHS.indexOf(a.name) - MONTHS.indexOf(b.name)
        );
        setChartData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const BearerToken = localStorage.getItem("BearerToken");
  const restaurantId = localStorage.getItem("restaurant_id");
  if (loading) {
    return (
      <div className="bg-white rounded-xl mt-3 p-4 w-full h-[22rem] flex justify-center items-center">
        <Spinner color="indigo" />
      </div>
    );
  }
  return (
    <div className="h-[22rem] bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">
        {props.title} Transactions
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
