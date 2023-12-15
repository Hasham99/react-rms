// export function MenuManagement() {
//   return (

import ItemsCard from "./element/ItemsCard";

//   );
// }
// import React from "react";

const MenuManagement = () => {
  return (
    <>
      <div className="text-2xl text-[#092635] font-bold py-4">Menu</div>
      <div className="grid grid-cols-3">
        <ItemsCard />
        <ItemsCard />
        <ItemsCard />
      </div>
    </>
  );
};

export default MenuManagement;
