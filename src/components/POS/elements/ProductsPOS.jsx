import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import POSDialog from "./ProductDialog/POSDialog";

const ProductsPOS = () => {
  const [categories, setCategories] = useState([]);
  const [itemData, setItemData] = useState([]);

  const handleClick = (item, category) => {
    handleOpen("sm");
    const jsonData = {
      subcategory_id: category.subcategory_id,
      item: item,
    };
    // alert(JSON.stringify(jsonData));
    setItemData(jsonData);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://albadwan.shop/api/cai/v2/res/1`);
        const data = await response.json();
        localStorage.setItem("products", JSON.stringify(data));
        // const data1 = localStorage.getItem("products");
        // (data1);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // setCategories(JSON.parse(localStorage.getItem("products")));
    fetchData();
  }, []);
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  return (
    <>
      <Card>
        <CardBody>
          <Typography variant="h3">Products</Typography>
          {categories.map((category) => (
            <div key={category.subcategory_id}>
              <div className="border-t border-gray-400 py-3 my-2 ">
                <Typography variant="h5">
                  {category.subcategory_name}
                </Typography>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.item_id}
                    className="border p-4 rounded-md bg-white shadow-md cursor-pointer"
                    onClick={() => {
                      handleClick(item, category);
                    }}
                  >
                    <Typography variant="h6" className="">
                      {item.item_name}
                    </Typography>
                    <p className="text-gray-600">${item.item_price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogBody className="p-10">
          <POSDialog itemDetails={itemData} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProductsPOS;
