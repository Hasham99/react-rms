// // export function MenuManagement() {
// //   return (

// import CategoriesCard from "./element/CategoriesCard";
// import ItemsCard from "./element/ItemsCard";
// import SubCategoriesCard from "./element/SubCategoriesCard";

// //   );
// // }
// // import React from "react";

// const MenuManagement = () => {
//   return (
//     <>
//       <div className="text-2xl text-[#092635] font-bold py-4">Menu</div>
//       <div className="grid grid-cols-3">
//         <CategoriesCard />
//         <SubCategoriesCard />
//         <ItemsCard />
//       </div>
//     </>
//   );
// };

// export default MenuManagement;

import { Option, Select } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

function MenuManagement() {
  const [data, setData] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [filteredItemNames, setFilteredItemNames] = useState([]);

  useEffect(() => {
    // Fetch data from the provided API
    fetch("http://52.90.182.126:3000/api/cai/v2/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter item names based on selected subcategory_id
    if (selectedSubcategoryId !== null) {
      const selectedSubcategory = data.find(
        (subcategory) => subcategory.subcategory_id === selectedSubcategoryId
      );

      if (selectedSubcategory) {
        const itemNames = selectedSubcategory.items.map(
          (item) => item.item_name
        );
        setFilteredItemNames(itemNames);
      } else {
        setFilteredItemNames([]);
      }
    } else {
      // If no subcategory is selected, show all item names
      const itemNames = data.flatMap((subcategory) =>
        subcategory.items.map((item) => item.item_name)
      );
      setFilteredItemNames(itemNames);
    }
  }, [selectedSubcategoryId, data]);

  return (
    <div>
      <h1>Filter Item Names by Subcategory</h1>
      <label>Select a subcategory: </label>
      <Select
        value={selectedSubcategoryId}
        onChange={(e) => setSelectedSubcategoryId(parseInt(e.target.value))}
      >
        <Option value={null}>-- All Subcategories --</Option>
        {data.map((subcategory) => (
          <option
            key={subcategory.subcategory_id}
            value={subcategory.subcategory_id}
          >
            {subcategory.subcategory_name}
          </option>
        ))}
      </Select>
      <h2>Filtered Item Names:</h2>
      <ul>
        {filteredItemNames.map((itemName, index) => (
          <li key={index}>{itemName}</li>
        ))}
      </ul>
    </div>
  );
}
export default MenuManagement;
