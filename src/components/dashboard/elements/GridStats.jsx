/* eslint-disable react/prop-types */
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

const GridStats = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [monthlyExpense, setMonthlyExpense] = useState(null);
  const [dailyIncome, setDailyIncome] = useState(null);
  const [dailyExpense, setDailyExpense] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyIncomeExpenseData = async () => {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      await fetch(
        `https://albadwan.shop/api/expense/res/${restaurantId}/combined/monthly`,
        { headers: headers }
      )
        .then((response) => response.json())
        .then((data) => {
          setMonthlyExpense(data.Expense);
          setMonthlyIncome(data.Income);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const fetchDailyIncomeExpenseData = async () => {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      await fetch(
        `https://albadwan.shop/api/expense/res/${restaurantId}/combined/daily`,
        // `https://albadwan.shop/api/expense/res/${restaurantId}/pos/monthly`,
        { headers: headers }
      )
        .then((response) => response.json())
        .then((data) => {
          setDailyExpense(data.Expense);
          setDailyIncome(data.Income);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchMonthlyIncomeExpenseData();
    fetchDailyIncomeExpenseData();
  }, []);
  const currency = localStorage.getItem("currency");
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        <div className="w-full h-20 bg-white rounded-xl flex justify-center items-center">
          <Spinner color="indigo" />
        </div>
        <div className="w-full h-20 bg-white rounded-xl flex justify-center items-center">
          <Spinner color="indigo" />
        </div>
        <div className="w-full h-20 bg-white rounded-xl flex justify-center items-center">
          <Spinner color="indigo" />
        </div>
        <div className="w-full h-20 bg-white rounded-xl flex justify-center items-center">
          <Spinner color="indigo" />
        </div>
      </div>
    );
  }
  return (
    <div className=" flex gap-4 ">
      <BoxWrapper className="">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#0ea5e9]">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4 ">
          <span className="text-sm text-gray-500 font-light">Daily Sales</span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency} {dailyIncome ? dailyIncome : 0}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">+343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper className="">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Daily Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency} {dailyExpense ? dailyExpense : 0}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">-343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper className="">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#0ea5e9]">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Monthly Sales
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency} {monthlyIncome ? monthlyIncome : 0}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">+343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper className="">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Monthly Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency} {monthlyExpense ? monthlyExpense : 0}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">-343</span> */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex-1 border border-gray-200 flex items-center ">
      {children}
    </div>
  );
}
export default GridStats;
