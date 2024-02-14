import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
// import Products from "./components/products/Products";
import Settings from "./components/settings/Settings";
// import Account from "./components/settings/elements/Account";
import MenuManagement from "./components/Menu-management/MenuManagement";
import Inventory from "./components/Inventory/Inventory";
// import Users from "./components/staff-management/StaffManagement";
import { Transactions } from "./components/transactions/Transactions";
import StaffManagement from "./components/staff-management/StaffManagement";
// import RecentOrders from "./components/dashboard/elements/RecentOrders";
import Pos from "./components/POS/Pos";
import Cart from "./components/Cart/Cart";
import Ingredients from "./components/Ingredients/Ingredients";
import CashManagement from "./components/cashManagement/CashManagement";
import CostManagement from "./components/costManagement/CostManagement";
import Login from "./components/login/UserLogin";
import StaffOrders from "./components/Orders/StaffOrders";
import AdminOrders from "./components/Orders/AdminOrders";
import ContactUs from "./components/contact-us/ContactUs";
import CartTest from "./components/CartTest";
import PrivateRoute from "./PrivateRoute";
import FirstPayment from "./components/paymentMethod/FirstPayment";
import SecondPayment from "./components/paymentMethod/SecondPayment";
import ThirdPayment from "./components/paymentMethod/ThirdPayment";
import FourthPayment from "./components/paymentMethod/FourthPayment";
import FifthPayment from "./components/paymentMethod/FifthPayment";
import SixthPayment from "./components/paymentMethod/SixthPayment";
import SeventhPayment from "./components/paymentMethod/SeventhPayment";
import EighthPayment from "./components/paymentMethod/EighthPayment";
import NinthPayment from "./components/paymentMethod/NinthPayment";
import TenthPayment from "./components/paymentMethod/TenthPayment";
import EleventhPayment from "./components/paymentMethod/EleventhPayment";
import TwelvthPayment from "./components/paymentMethod/TwelvthPayment";
import ThirteenthPayment from "./components/paymentMethod/ThirteenthPayment";
import FourteenthPayment from "./components/paymentMethod/FourteenthPayment";
import FifteenthPayment from "./components/paymentMethod/FifteenthPayment";
import SixteenthPayment from "./components/paymentMethod/SixteenthPayment";
import SeventeenthPayment from "./components/paymentMethod/SeventeenthPayment";
import EighteenthPayment from "./components/paymentMethod/EighteenthPayment";
import NinteenthPayment from "./components/paymentMethod/NinteenthPayment";
import TwentythPayment from "./components/paymentMethod/TwentythPayment";
import Printing from "./components/Printing/Printing";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/cart" element={<PrivateRoute Component={CartTest} />} />
        <Route path="/" element={<PrivateRoute Component={Layout} />}>
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
          <Route
            path="/admin-orders"
            element={<PrivateRoute Component={AdminOrders} />}
          />
          <Route
            path="/staff-orders"
            element={<PrivateRoute Component={StaffOrders} />}
          />
          <Route path="/pos" element={<PrivateRoute Component={Pos} />} />
          <Route
            path="/inventory"
            element={<PrivateRoute Component={Inventory} />}
          />
          <Route
            path="/staff-management"
            element={<PrivateRoute Component={StaffManagement} />}
          />
          <Route
            path="/menu-management"
            element={<PrivateRoute Component={MenuManagement} />}
          />
          <Route
            path="/ingredients"
            element={<PrivateRoute Component={Ingredients} />}
          />
          <Route
            path="/cost-management"
            element={<PrivateRoute Component={CostManagement} />}
          />
          <Route
            path="/cash-management"
            element={<PrivateRoute Component={CashManagement} />}
          />

          <Route
            path="/payment/method/1"
            element={<PrivateRoute Component={FirstPayment} />}
          />
          <Route
            path="/payment/method/2"
            element={<PrivateRoute Component={SecondPayment} />}
          />
          <Route
            path="/payment/method/3"
            element={<PrivateRoute Component={ThirdPayment} />}
          />
          <Route
            path="/payment/method/4"
            element={<PrivateRoute Component={FourthPayment} />}
          />
          <Route
            path="/payment/method/5"
            element={<PrivateRoute Component={FifthPayment} />}
          />
          <Route
            path="/payment/method/6"
            element={<PrivateRoute Component={SixthPayment} />}
          />
          <Route
            path="/payment/method/7"
            element={<PrivateRoute Component={SeventhPayment} />}
          />
          <Route
            path="/payment/method/8"
            element={<PrivateRoute Component={EighthPayment} />}
          />
          <Route
            path="/payment/method/9"
            element={<PrivateRoute Component={NinthPayment} />}
          />
          <Route
            path="/payment/method/10"
            element={<PrivateRoute Component={TenthPayment} />}
          />
          <Route
            path="/payment/method/11"
            element={<PrivateRoute Component={EleventhPayment} />}
          />
          <Route
            path="/payment/method/12"
            element={<PrivateRoute Component={TwelvthPayment} />}
          />
          <Route
            path="/payment/method/13"
            element={<PrivateRoute Component={ThirteenthPayment} />}
          />
          <Route
            path="/payment/method/14"
            element={<PrivateRoute Component={FourteenthPayment} />}
          />
          <Route
            path="/payment/method/15"
            element={<PrivateRoute Component={FifteenthPayment} />}
          />
          <Route
            path="/payment/method/16"
            element={<PrivateRoute Component={SixteenthPayment} />}
          />
          <Route
            path="/payment/method/17"
            element={<PrivateRoute Component={SeventeenthPayment} />}
          />
          <Route
            path="/payment/method/18"
            element={<PrivateRoute Component={EighteenthPayment} />}
          />
          <Route
            path="/payment/method/19"
            element={<PrivateRoute Component={NinteenthPayment} />}
          />
          <Route
            path="/payment/method/20"
            element={<PrivateRoute Component={TwentythPayment} />}
          />

          <Route
            path="/transactions"
            element={<PrivateRoute Component={Transactions} />}
          />
          <Route
            path="/support"
            element={<PrivateRoute Component={ContactUs} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute Component={Settings} />}
          />
          <Route
            path="/printing"
            element={<PrivateRoute Component={Printing} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
