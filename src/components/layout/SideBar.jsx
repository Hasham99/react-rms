// /* eslint-disable react/prop-types */

import React, { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout, HiChevronDown, HiChevronRight } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../lib/constants/index";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-[#5C8374] hover:no-underline active:bg-[#9EC8B9] rounded-sm text-base";

export default function SideBar() {
  const { pathname } = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState([]);

  const toggleSubMenu = (index) => {
    if (openSubmenus.includes(index)) {
      setOpenSubmenus(openSubmenus.filter((item) => item !== index));
    } else {
      setOpenSubmenus([...openSubmenus, index]);
    }
  };

  return (
    <div className="bg-[#092635] w-60 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-200 text-white font-medium text-lg">
          Anunzio FZC
        </span>
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link, index) => (
          <div key={link.key}>
            {link.submenu ? (
              <div
                className={classNames(
                  "cursor-pointer",
                  "text-[#9EC8B9]",
                  linkClass,
                  openSubmenus.includes(index) && "bg-[#1B4242] text-white"
                )}
                onClick={() => toggleSubMenu(index)}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
                <span className="text-xl ml-auto">
                  {openSubmenus.includes(index) ? (
                    <HiChevronDown />
                  ) : (
                    <HiChevronRight />
                  )}
                </span>
              </div>
            ) : (
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
            )}
            {openSubmenus.includes(index) && link.submenu && (
              <div className="pl-5">
                {link.submenu.map((sublink) => (
                  <SidebarLink key={sublink.key} link={sublink} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-0.5 pt-2 border-t border-white">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
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
