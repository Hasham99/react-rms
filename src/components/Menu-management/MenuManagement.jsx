// export function MenuManagement() {
//   return (

import CategoriesCard from "./element/CategoriesCard";
import ItemsCard from "./element/ItemsCard";
import SubCategoriesCard from "./element/SubCategoriesCard";

//   );
// }
// import React from "react";

const MenuManagement = () => {
  return (
    <>
      <div className="text-2xl text-[#092635] font-bold py-4">Menu</div>
      <div className="grid grid-cols-3">
        <CategoriesCard />
        <SubCategoriesCard />
        <ItemsCard />
      </div>
    </>
  );
};

export default MenuManagement;
