/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

const GridStats = () => {
  const [incomeExpenseDailyData, setIncomeExpenseDailyData] = useState(null);
  const [incomeExpenseMonthlyData, setIncomeExpenseMonthlyData] =
    useState(null);

  useEffect(() => {
    const fetchMonthlyIncomeExpenseData = async () => {
      try {
        const response = await fetch(
          `https://albadwan.shop/api/expense/res/${restaurantId}/pos/monthly`
        );
        const data = await response.json();
        setIncomeExpenseMonthlyData(data);
      } catch (error) {
        console.error("Error fetching income and expense data:", error);
      }
    };
    const fetchDailyIncomeExpenseData = async () => {
      try {
        const response = await fetch(
          `https://albadwan.shop/api/expense/res/${restaurantId}/pos/daily`
        );
        const data = await response.json();
        setIncomeExpenseDailyData(data);
      } catch (error) {
        console.error("Error fetching income and expense data:", error);
      }
    };

    fetchMonthlyIncomeExpenseData();
    fetchDailyIncomeExpenseData();
  }, []);
  const currency = localStorage.getItem("currency");
  const restaurantId = localStorage.getItem("restaurant_id");
  return (
    <div className=" flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#0ea5e9]">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Daily Sales</span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency}{" "}
              {incomeExpenseDailyData ? incomeExpenseDailyData.Income : 0}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">+343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Daily Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency}{" "}
              {incomeExpenseDailyData ? incomeExpenseDailyData.Expense : 0}
              {/* {`${currency} ${incomeExpenseDailyData.Expense}`} */}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">-343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#0ea5e9]">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Monthly Sales
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency}{" "}
              {incomeExpenseMonthlyData ? incomeExpenseMonthlyData.Income : 0}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">+343</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Monthly Expenses
          </span>
          <div className="flex items-center">
            <strong className="text-lg text-gray-700 font-semibold">
              {currency}{" "}
              {incomeExpenseMonthlyData ? incomeExpenseMonthlyData.Expense : 0}
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
