import BuyerProfilePieChart from "./elements/BuyerProfilePieChart";
import GridStats from "./elements/GridStats";
import TransactionChart from "./elements/TransactionChart";
import RecentOrders from "./elements/RecentOrders";
import PopularProducts from "./elements/PopularProducts";

const Dashboard = () => {
  return (
    <div className=" flex flex-col gap-4 no-scrollbar">
      <GridStats />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart
          title={`POS`}
          url={`https://albadwan.shop/api/expense/res/1/pos/monthly`}
        />
        <TransactionChart
          title={`Waiter`}
          url={`https://albadwan.shop/api/expense/res/1/waiter/monthly/admin`}
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
