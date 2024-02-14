import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";
import { ImDrawer } from "react-icons/im";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiRestaurant2Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  // {
  // key: "orders",
  // label: "Orders",
  // // path: "/orders",
  // icon: <HiOutlineCube />,
  // submenu: [
  {
    key: "pos-orders",
    label: "POS Orders",
    icon: <HiOutlineCube />,
    path: "/admin-orders",
  },
  {
    key: "staff-orders",
    label: "Waiter Orders",
    icon: <HiOutlineCube />,
    path: "/staff-orders",
  },
  // Add more submenu items as needed
  // ],
  // },
  {
    key: "pos",
    label: "POS",
    path: "/pos",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "inventory",
    label: "Inventory",
    path: "/inventory",
    icon: <MdOutlineInventory2 />,
  },
  {
    key: "menu-management",
    label: "Menu Management",
    path: "/menu-management",
    icon: <RiRestaurant2Line />,
  },
  {
    key: "staff-management",
    label: "Staff Management",
    path: "/staff-management",
    icon: <LuUsers2 />,
  },
  {
    key: "ingredients",
    label: "Ingredients",
    path: "/ingredients",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "cost-management",
    label: "Cost Management",
    path: "/cost-management",
    icon: <GiTakeMyMoney />,
    // icon: <HiOutlineDocumentText />,
  },
  {
    key: "cash-management",
    label: "Drawer Management",
    path: "/cash-management",
    icon: <ImDrawer />,
    // icon: <HiOutlineDocumentText />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
