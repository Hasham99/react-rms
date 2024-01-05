import {
  Card,
  CardBody,
  Typography,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Dialog,
  DialogBody,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
// import React, { useState } from "react";
import { addToCart } from "../../../redux/CartSlice";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

// import POSDialog from "./ProductDialog/POSDialog";

const ProductsPOS = () => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };
  const listItems = ["React.js", "Vue.js", "Svelte.js", "Angular.js"];

  const [selectedListItems, setSelectedListItems] = useState([]);

  const handleListItemClick = (item) => {
    setSelectedListItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        // If the item is already selected, remove it
        return prevSelected.filter((selected) => selected !== item);
      } else {
        // If the item is not selected, add it
        return [...prevSelected, item];
      }
    });
  };

  const handleLogSelectedListItems = () => {
    console.log("Selected List Items:", selectedListItems);
    // You can customize this logic based on your requirements
    alert("Selected List Items:\n" + selectedListItems.join("\n"));
  };

  const handleSubmit = () => {
    const jsonData = {
      // item: {
      menuitemID: itemData.item.item_id,
      name: itemData.item.item_name,
      price: itemData.item.item_price,
      quantity: parseInt(formData),
      kitchenID: itemData.item.kitchen_id,
      categoryID: itemData.subcategory_id,
      itemExtras: [{}],
      note: "",
      // },
    };
    // alert(JSON.stringify(jsonData));
    console.log(jsonData);
    // dispatch(addToCart(jsonData));
    setFormData("");
    handleClose();
  };

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
        // localStorage.setItem("products", JSON.stringify(data));
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
  const handleClose = () => setSize(null); // Function to close the dialog
  const currency = localStorage.getItem("currency");
  return (
    <>
      <Card>
        <CardBody>
          <Typography className="font-bold text-2xl text-gray-800">
            Products
          </Typography>
          {categories.map((category) => (
            <div key={category.subcategory_id}>
              <div className="border-t border-gray-400 py-3 my-2 ">
                <Typography className="text-lg font-bold text-green-600">
                  {category.subcategory_name}
                </Typography>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.item_id}
                    className="space-y-1 border-r-2 border-green-600 p-4 rounded-md bg-white shadow-md cursor-pointer"
                    onClick={() => {
                      handleClick(item, category);
                    }}
                  >
                    <Typography className="text-[14px] font-semibold">
                      {item.item_name}
                    </Typography>
                    <p className="text-gray-600 text-[14px]">
                      {currency} {item.item_price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
      <Dialog
        className="z-50"
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
        <DialogBody className="p-10 h-[85vh] overflow-y-scroll">
          {/* <POSDialog itemDetails={itemData} /> */}
          <Card className="space-y-2" color="transparent" shadow={false}>
            <div className="text-center">
              <Typography variant="h4" className=" text-sidebar">
                Enter Quantity
              </Typography>
            </div>

            <Typography variant="h6" color="blue-gray" className="">
              Quantity
            </Typography>
            <Input
              required
              type="number"
              size="lg"
              placeholder="Quantity"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              // name="quantity"
              value={formData}
              onChange={handleInputChange}
            />
            <List className="bg-gray-200">
              {listItems.map((item) => (
                <ListItem key={item} className="p-0">
                  <label
                    htmlFor={`vertical-list-${item.toLowerCase()}`}
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id={`vertical-list-${item.toLowerCase()}`}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                        onChange={() => handleListItemClick(item)}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {item}
                    </Typography>
                  </label>
                </ListItem>
              ))}
              {/* ... (similar ListItem components for Vue.js and Svelte.js) */}
            </List>
            <Button
              onClick={handleLogSelectedListItems}
              className="mt-6"
              fullWidth
              type="button"
            >
              Click Me
            </Button>
            <Button
              onClick={handleSubmit}
              className="mt-6"
              fullWidth
              type="submit"
            >
              Add Item
            </Button>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProductsPOS;
