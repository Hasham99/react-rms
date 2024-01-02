import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { FaRegWindowClose } from "react-icons/fa";
import axios from "axios";

export function AddInventoryItem(props) {
  // Define state variables to store form data
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    itemId: null,
    itemName: "",
  });

  const [formData, setFormData] = useState({
    available: "",
    reserved: "",
  });

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const on_Hand = parseInt(formData.available) + parseInt(formData.reserved);
  const jsonData = {
    menuitem_id: `${selectedOption.itemId}`,
    unit: `${formData.unit}`,
    available: `${formData.available}`,
    reserved: `${formData.reserved}`,
    on_hand: `${on_Hand}`,
  };

  // Event handler for form submission
  const handleSubmit = () => {
    axios
      .post(`https://albadwan.shop/api/inventory/create`, jsonData)
      // .post(`${import.meta.env.VITE_API_KEY}/inventory/create`, jsonData)
      .then((response) => {
        console.log("Post request successful", response.data);
        // Handle the response data here if needed
      })
      .catch((error) => {
        console.error("Error making post request", error);
        // Handle errors here if needed
      });
    alert(JSON.stringify(jsonData));

    // Handle the response, e.g., show a success message
    alert("POST request successful");
    // alert(
    //   `
    //   'Item ID '${selectedOption.itemId}
    //   'Item Name '${selectedOption.itemName}
    //   'Unit '${formData.unit}
    //   'availability '${formData.available}
    //   'reserved '${formData.reserved}
    //   'on Hand '${on_hand}
    //   `
    // );
  };
  // const { handleClose } = props;

  useEffect(() => {
    const fetchInventoryData = async () => {
      // Fetch data from your API
      await fetch(`https://albadwan.shop/api/cai`)
        // await fetch(`${import.meta.env.VITE_API_KEY}/api/cai`)
        .then((response) => response.json())
        .then((data) => {
          // Extract "item_name" from the menu items
          const extractedItemNames = data.reduce((accumulator, category) => {
            return [
              ...accumulator,
              ...category.subcategories.reduce(
                (subAccumulator, subcategory) => {
                  return [
                    ...subAccumulator,
                    ...subcategory.menu.map((item) => ({
                      itemId: item.item_id,
                      itemName: item.item_name,
                    })),
                  ];
                },
                []
              ),
            ];
          }, []);

          localStorage.setItem(
            "inventory-Items",
            JSON.stringify(extractedItemNames)
          );

          const local_inventory_items = JSON.parse(
            localStorage.getItem("inventory-Items")
          );
          setCategoryOptions(local_inventory_items);
        })
        .catch((error) => {
          console.error("Error fetching data from API", error);
        });
    };
    fetchInventoryData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <form
      className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
      onSubmit={() => {
        // Prevent the form submission for this example
        try {
          handleSubmit();
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <div className="mb-1 flex flex-col gap-3">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Menu Item
        </Typography>
        <Select
          color="teal"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          {/* {categoryOptions.map((item, index) => (
              <Option key={index} value={item}>
                {item.itemName}
              </Option>
            ))} */}
          {categoryOptions.map((data) => (
            <Option key={data.itemId} value={data}>
              {data.itemName}
            </Option>
          ))}
        </Select>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Unit
        </Typography>
        <Input
          required
          type="text"
          size="lg"
          placeholder="unit"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="unit"
          value={formData.unit}
          onChange={handleInputChange}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Available
        </Typography>
        <Input
          required
          type="number"
          size="lg"
          placeholder="Available Quantity"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="available"
          value={formData.available}
          onChange={handleInputChange}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Reserved
        </Typography>
        <Input
          required
          type="number"
          size="lg"
          placeholder="Reserved Quantity"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="reserved"
          value={formData.reserved}
          onChange={handleInputChange}
        />
      </div>
      <Button className="mt-6" fullWidth type="submit">
        Add Item
      </Button>
    </form>
  );
}
