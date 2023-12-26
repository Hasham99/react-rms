import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Pos from "./components/POS/Pos";
import Cart from "./components/Cart/Cart";
import Ingredients from "./components/Ingredients/Ingredients";
import CostManagement from "./components/costManagement/CostManagement";
import Login from "./components/login/UserLogin";

// Dummy authentication check function (replace it with your actual authentication logic)
// const isAuthenticated = () => {
//   // Check if the user is authenticated (you may use your own authentication logic)
//   // For example, check if there is a token in localStorage
//   return localStorage.getItem("authToken") !== null;
// };

// // PrivateRoute HOC to protect routes
// const PrivateRoute = ({ element, ...rest }) => {
//   return isAuthenticated() ? (
//     React.cloneElement(element, rest)
//   ) : (
//     <Navigate to="/login" />
//   );
// };

function App() {
  // const variable_env = process.env.VITE_REACT_APP_API_KEY;
  // console.log(import.meta.env.VITE_API_KEY);
  // console.log(process.env.VITE_KEY);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="/cost-management" element={<newFile />} /> */}
          <Route path="/orders" element={<RecentOrders />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/cost-management" element={<CostManagement />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route path="/settings-accounts" element={<Account />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
