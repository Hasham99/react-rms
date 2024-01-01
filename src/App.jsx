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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/cost-management" element={<newFile />} /> */}
          <Route path="/orders/admin" element={<AdminOrders />} />
          <Route path="/orders/staff" element={<StaffOrders />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/cost-management" element={<CostManagement />} />
          <Route path="/transactions" element={<Transactions />} />
          {/* <Route path="/settings" element={<SettingsLayout />}> */}
          <Route path="/support" element={<ContactUs />} />
          <Route path="/settings" element={<Settings />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
