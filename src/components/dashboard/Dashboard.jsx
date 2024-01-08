import BuyerProfilePieChart from "./elements/BuyerProfilePieChart";
import GridStats from "./elements/GridStats";
import TransactionChart from "./elements/TransactionChart";
import RecentOrders from "./elements/RecentOrders";
import PopularProducts from "./elements/PopularProducts";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const restaurantId = localStorage.getItem("restaurant_id");
  // const [defaultCurrency, setDefaultCurrency] = useState("");
  // useEffect(() => {
  //   // Fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://albadwan.shop/api/timezones/res/1"
  //       );
  //       const data = response.data;

  //       // Extract values from the response and set them in state
  //       if (data && data.timezone && data.timezone.length > 0) {
  //         const timezoneData = data.timezone[0];
  //         setDefaultCurrency(timezoneData.default_currency);
  //         localStorage.setItem("currency", JSON.stringify(defaultCurrency));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <div className=" flex flex-col gap-4 no-scrollbar">
      <GridStats />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart
          title={`POS`}
          url={`https://albadwan.shop/api/expense/res/${restaurantId}/pos/monthly`}
        />
        <TransactionChart
          title={`Waiter`}
          url={`https://albadwan.shop/api/expense/res/${restaurantId}/waiter/monthly/admin`}
        />
        {/* <BuyerProfilePieChart /> */}
      </div>{" "}
      {/* <div className="flex flex-row gap-4 w-full">
        <TransactionChart
          url={`https://albadwan.shop/api/expense/res/1/waiter/monthly/admin`}
        />
        <BuyerProfilePieChart />
      </div> */}
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
        {/* <PopularProducts /> */}
      </div>
    </div>
  );
};

export default Dashboard;
