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
import CostManagement from "./components/costManagement/CostManagement";
import Login from "./components/login/UserLogin";
import StaffOrders from "./components/Orders/StaffOrders";
import AdminOrders from "./components/Orders/AdminOrders";
import ContactUs from "./components/contact-us/ContactUs";
import CartTest from "./components/CartTest";
import PrivateRoute from "./PrivateRoute";

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
