import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { IoRestaurantOutline } from "react-icons/io5";
import { HiOutlineLogout, HiChevronDown, HiChevronRight } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../lib/constants/index";
import { Spinner } from "@material-tailwind/react";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-[#5C8374] hover:no-underline active:bg-[#9EC8B9] rounded-sm text-base";

export default function SideBar() {
  const { pathname } = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const [sidebarData, setSidebarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const restaurantName = localStorage.getItem("restaurant_name");

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(
          `https://albadwan.shop/api/payment/res/${restaurantId}/get`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const apiSidebarItems = data.map((item) => ({
            key: `api-${item.series}`,
            label: item.p_name,
            path: `/payment/method/${item.series}`,
            icon: <MdPayment />,
          }));

          const combinedSidebarData = [
            ...DASHBOARD_SIDEBAR_LINKS,
            ...apiSidebarItems,
          ];

          // Convert the combined sidebar data to a JSON string
          const combinedSidebarDataString = JSON.stringify(combinedSidebarData);

          // Store the combined sidebar data in localStorage
          localStorage.setItem("sidebarData", combinedSidebarDataString);

          // Set the combined sidebar data in a state variable
          setSidebarData(combinedSidebarData);
          setLoading(false);
        } else {
          console.error("Failed to fetch sidebar data");
          // If fetching API data fails, set sidebar data to only the existing sidebar items

          setSidebarData(DASHBOARD_SIDEBAR_LINKS);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
        // If an error occurs, set sidebar data to only the existing sidebar items
        setSidebarData(DASHBOARD_SIDEBAR_LINKS);
      }
    };
    fetchSidebarData();
  }, []);

  const toggleSubMenu = (index) => {
    if (openSubmenus.includes(index)) {
      setOpenSubmenus(openSubmenus.filter((item) => item !== index));
    } else {
      setOpenSubmenus([...openSubmenus, index]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const BearerToken = localStorage.getItem("BearerToken");
  const restaurantId = localStorage.getItem("restaurant_id");
  if (loading) {
    return (
      <div className="bg-[#092635] w-60 h-screen flex justify-center items-center">
        <Spinner color="light-blue" />
      </div>
    ); // Display loading message while data is being fetched
  }
  return (
    <div className="bg-[#092635] w-60 p-3 flex flex-col">
      <div className="flex-col items-center ml-3 gap-2 px-1 py-2">
        <div className="flex items-center gap-2">
          <IoRestaurantOutline className="text-green-600 my-1 " fontSize={16} />
          <div className="flex-col">
            <div className="text-white font-medium text-[20px] uppercase">
              Restaurant
            </div>
            <div className="text-white font-medium text-[12px] ">
              {restaurantName}
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 flex flex-1 flex-col gap-0.5 h-3/4 overflow-y-auto ">
        {sidebarData
          ? sidebarData.map((link, index) => (
              <div key={link.key}>
                <Link
                  to={link.path}
                  className={classNames(
                    pathname === link.path
                      ? "bg-[#1B4242] text-white"
                      : "text-[#9EC8B9]",
                    linkClass
                  )}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              </div>
            ))
          : []}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-white">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <Link
          onClick={handleLogout}
          className={classNames(linkClass, "cursor-pointer text-red-500")}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </Link>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path ? "bg-[#1B4242] text-white" : "text-[#9EC8B9]",
        linkClass
      )}
    >
      {/* <span className="text-xl"></span> */}
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
