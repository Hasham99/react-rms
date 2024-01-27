import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Menu, Popover } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.length);
  const handleLogout = () => {
    // Clear local storage data
    localStorage.clear();
    // Navigate to '/'
    // navigate("/");
    window.location.href = "/";
  };
  return (
    <div className="  bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        {/* {cartItems > 0 && (
          <Popover className="flex justify-between ">
            <Link to={"/cart"}>
              <div className="flex items-start">
                <HiOutlineShoppingCart
                  className="text-gray-700"
                  fontSize={24}
                />
                <span className="text-white bg-green-500 rounded-full text-[12px]  px-1">
                  {cartItems}
                </span>
              </div>
            </Link>
          </Popover>
        )} */}

        <Popover className="flex justify-between ">
          <Link to={"/cart"}>
            <span className="flex items-start cursor-pointer">
              <HiOutlineShoppingCart
                className="text-gray-700"
                fontSize={24}
                onClick={() => setCartDialogOpen(true)}
              />
              <span className="text-white bg-green-500 rounded-full text-[12px]  px-1">
                {cartItems == 0 ? "" : cartItems}
              </span>
            </span>
          </Link>
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-50 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is messages panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-50 mt-2.5 transform w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notifications
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is notification panel.
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 bg-gray-400 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10  rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                // style={{
                //   backgroundImage:
                //     'url("https://source.unsplash.com/80x80?face")',
                // }}

                style={{
                  backgroundImage:
                    'url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")',
                }}
              >
                <span className="sr-only">Marc Backes</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className=" origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={handleLogout}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
export default Header;
