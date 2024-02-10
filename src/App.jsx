import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/cart" element={<PrivateRoute Component={CartTest} />} />
        <Route path="/" element={<PrivateRoute Component={Layout} />}>
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
          {/* <Route path="/cost-management" element={<newFile />} /> */}
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
            path="/transactions"
            element={<PrivateRoute Component={Transactions} />}
          />
          {/* <Route path="/settings" element={<SettingsLayout />}> */}
          <Route
            path="/support"
            element={<PrivateRoute Component={ContactUs} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute Component={Settings} />}
          />
          {/* </Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
