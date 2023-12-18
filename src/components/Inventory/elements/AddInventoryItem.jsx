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

export function AddInventoryItem(props) {
  // Define state variables to store form data
  const [categoryOptions, setCategoryOptions] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
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
  // Event handler for form submission
  const handleSubmit = () => {
    const on_hand = parseInt(formData.available) + parseInt(formData.reserved);
    alert(`${formData.available} ${formData.reserved} ${on_hand} `);
    console.log(selectedOption);
  };
  const { handleClose } = props;

  useEffect(() => {
    const fetchInventoryData = async () => {
      // Fetch data from your API
      await fetch("http://52.90.182.126:3000/api/cai")
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

          setCategoryOptions(extractedItemNames);
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
    <Card color="transparent" shadow={false}>
      <div className="flex justify-between items-center">
        <Typography variant="h4" className="text-sidebar">
          Add Inventory Item
        </Typography>
        <div onClick={handleClose}>
          <FaRegWindowClose className="cursor-pointer" />
        </div>
      </div>
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
            // value={selectedOption}
            value={selectedOption}
            onChange={handleSelectChange}

            // onClick={handleSelectChange}
          >
            {categoryOptions.map((item, index) => (
              <Option key={index} value={item}>
                {item.itemName}
              </Option>
            ))}
          </Select>

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
    </Card>
  );
}
