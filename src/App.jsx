import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./components/dashboard/Dashboard";
import Products from "./components/products/Products";
import Settings from "./components/settings/Settings";
import SettingsLayout from "./components/settings/layout/SettingsLayout";
import Account from "./components/settings/elements/Account";
import MenuManagement from "./components/Menu-management/MenuManagement";
import Inventory from "./components/Inventory/Inventory";
import Users from "./components/staff-management/StaffManagement";
import { Transactions } from "./components/transactions/Transactions";
import StaffManagement from "./components/staff-management/StaffManagement";
import RecentOrders from "./components/dashboard/elements/RecentOrders";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/products" element={<Products />} /> */}
          <Route path="/orders" element={<RecentOrders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="/settings-accounts" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
