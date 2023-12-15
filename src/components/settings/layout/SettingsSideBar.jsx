import React from "react";
import { Link, Outlet } from "react-router-dom";
import Account from "../elements/Account";

const SettingsSideBar = () => {
  return (
    <div>
      {/* <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1> */}

      <div className="relative my-4 w-40 sm:hidden">
        <input
          className="peer hidden"
          type="checkbox"
          name="select-1"
          id="select-1"
        />
        <label
          htmlFor="select-1"
          className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
        >
          Accounts{" "}
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
          <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
            Accounts
          </li>
          <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
            Team
          </li>
          <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
            Others
          </li>
        </ul>
      </div>

      <div className="col-span-2 hidden sm:block">
        <ul>
          <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700">
            Accounts
          </li>
          <Link to="/settings-accounts">
            <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
              Users
            </li>
          </Link>
          <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Profile
          </li>
          <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Billing
          </li>
          <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Notifications
          </li>
          <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
            Integrations
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsSideBar;
