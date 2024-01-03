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

export default function TransactionChart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${props.url}`);

        if (!response.data || response.data.length === 0) {
          // Handle empty or missing data
          setChartData([]);
          return;
        }

        const filledData = fillMissingMonths(response.data);
        setChartData(filledData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
