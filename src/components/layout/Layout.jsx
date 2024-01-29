// import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
// import Header from "./Header";

// const Layout = () => {
//   return (
//     // <div>Shark</div>
//     <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row invisible  md:visible lg:visible xl:visible ">
//       <SideBar />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <div className="flex-1 p-4 min-h-0 overflow-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout = () => {
  const [isVisible, setIsVisible] = useState(false);

  // useEffect to determine visibility based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1500px)"
    );
    setIsVisible(mediaQuery.matches);
    const handler = () => setIsVisible(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {isVisible ? (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row md:visible lg:visible xl:visible">
          <SideBar />
          <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 min-h-0 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <span className="text-md font-bold">Open in Desktop Mode</span>
        </div>
      )}
    </>
  );
};

export default Layout;
