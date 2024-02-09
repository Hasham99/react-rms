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
import { MdOutlineInventory2 } from "react-icons/md";
import { RiRestaurant2Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { LuUsers2 } from "react-icons/lu";

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
    // submenu: [
    //   {
    //     key: "subitem1",
    //     label: "Submenu Item 1",
    //     path: "/products/subitem1",
    //   },
    //   {
    //     key: "subitem2",
    //     label: "Submenu Item 2",
    //     path: "/products/subitem2",
    //   },
    //   // Add more submenu items as needed
    // ],
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
  // {
  //   key: "users",
  //   label: "Users",
  //   path: "/users",
  //   icon: <HiOutlineDocumentText />,
  // },
  {
    key: "staff-management",
    label: "Staff Management",
    path: "/staff-management",
    icon: <LuUsers2 />,
    // submenu: [
    //   {
    //     key: "subitem1",
    //     label: "Submenu Item 1",
    //     path: "/products/",
    //   },

    //   {
    //     key: "subitem2",
    //     label: "Submenu Item 2",
    //     path: "/products/subitem2",
    //   },
    //   // Add more submenu items as needed
    // ],
  },
  // {
  //   key: "transactions",
  //   label: "Transactions",
  //   path: "/transactions",
  //   icon: <GrTransaction />,
  // },
  // {
  //   key: "reports",
  //   label: "Reports",
  //   path: "/reports",
  //   icon: <HiOutlineDocumentText />,
  // },
  // {
  //   key: "promotions",
  //   label: "Promotions",
  //   path: "/promotions",
  //   icon: <HiOutlineDocumentText />,
  // },
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
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "cash-management",
    label: "Cash Management",
    path: "/cash-management",
    icon: <HiOutlineDocumentText />,
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
