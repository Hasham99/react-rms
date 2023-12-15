import { Outlet } from "react-router-dom";
import SettingsSideBar from "./SettingsSideBar";
import Account from "../elements/Account";

const SettingsLayout = () => {
  return (
    <div className="bg-neutral-100 h-screen w-full overflow-hidden ">
      <div className="mx-4 min-h-screen max-w-screen-xl  sm:mx-8 xl:mx-auto">
        <div className="grid grid-cols-9 pt-3 sm:grid-cols-10 ">
          <div className="col-span-2">
            <SettingsSideBar />
          </div>

          <div className="col-span-8 overflow-hidden  rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
