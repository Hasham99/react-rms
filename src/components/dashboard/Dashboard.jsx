import GridStats from "./elements/GridStats";
import RecentOrders from "./elements/RecentOrders";
import TransactionChartWaiter from "./elements/TransactionChartWaiter";
import TransactionChartPos from "./elements/TransactionChartPos";

const Dashboard = () => {
  // const restaurantId = localStorage.getItem("restaurant_id");
  return (
    <div className=" flex flex-col gap-4 no-scrollbar">
      <GridStats />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChartWaiter title={`Waiter`} />
        <TransactionChartPos title={`POS`} />
      </div>{" "}
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
