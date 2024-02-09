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
  const [Value, setValue] = useState([]);
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
  const handleInputChangeQuantity = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);

    // Check if parsedValue is a valid number and not negative
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setFormData({
        ...formData,
        [name]: parsedValue,
      });
    } else {
      // If parsedValue is not valid or negative, set it to zero
      setFormData({
        ...formData,
        [name]: 0,
      });
    }
  };

  const on_Hand = parseInt(formData.available) + parseInt(formData.reserved);
  const jsonData = {
    menuitem_id: `${selectedOption.itemId}`,
    unit: `${formData.unit}`,
    // available: `${formData.available}`,
    // reserved: `${formData.reserved}`,
    // on_hand: `${on_Hand}`,
    on_hand: `${formData.available}`,
  };

  // Event handler for form submission
  const handleSubmit = () => {
    const headers = {
      Authorization: `${BearerToken}`,
      "Content-Type": "application/json",
    };
    // alert(JSON.stringify(jsonData));
    axios
      .post(
        `https://albadwan.shop/api/inventory/res/${restaurantId}/create`,
        jsonData,
        { headers }
      )
      // .post(`${import.meta.env.VITE_API_KEY}/inventory/create`, jsonData)
      .then((response) => {
        console.log("Post request successful", response.data);
        window.location.reload();
        // Handle the response data here if needed
      })
      .catch((error) => {
        console.error("Error making post request", error);
        // Handle errors here if needed
      });

    // Handle the response, e.g., show a success message
    // alert("POST request successful");
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

  // useEffect(() => {
  //   const fetchInventoryData = async () => {
  //     // Fetch data from your API
  //     await fetch(`https://albadwan.shop/api/cai`)
  //       // await fetch(`${import.meta.env.VITE_API_KEY}/api/cai`)
  //       // .then((response) => response.json())
  //       .then((data) => {
  //         // Extract "item_name" from the menu items
  //         const extractedItemNames = data.reduce((accumulator, category) => {
  //           return [
  //             ...accumulator,
  //             ...category.subcategories.reduce(
  //               (subAccumulator, subcategory) => {
  //                 return [
  //                   ...subAccumulator,
  //                   ...subcategory.menu.map((item) => ({
  //                     itemId: item.item_id,
  //                     itemName: item.item_name,
  //                   })),
  //                 ];
  //               },
  //               []
  //             ),
  //           ];
  //         }, []);

  //         // localStorage.setItem(
  //         //   "inventory-Items",
  //         //   JSON.stringify(extractedItemNames)
  //         // );

  //         // const local_inventory_items = JSON.parse(
  //         //   localStorage.getItem("inventory-Items")
  //         // );
  //         // setCategoryOptions(local_inventory_items);
  //         console.log(extractedItemNames);
  //         setCategoryOptions(extractedItemNames);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data from API", error);
  //       });
  //   };
  //   fetchInventoryData();
  // }, []);

  useEffect(() => {
    const fetchInventoryData01 = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://albadwan.shop/api/cai/res/${restaurantId}`,
          { headers: headers }
        );
        const data = response.data;
        console.log(JSON.stringify(data));

        if (!data || !Array.isArray(data)) {
          console.error("Invalid data format:", data);
          return;
        }

        const extractedItemNames = data.reduce((accumulator, category) => {
          if (category.subcategories && Array.isArray(category.subcategories)) {
            return [
              ...accumulator,
              ...category.subcategories.reduce(
                (subAccumulator, subcategory) => {
                  if (subcategory.menu && Array.isArray(subcategory.menu)) {
                    return [
                      ...subAccumulator,
                      ...subcategory.menu.map((item) => ({
                        itemId: item.item_id,
                        itemName: item.item_name,
                      })),
                    ];
                  }
                  return subAccumulator;
                },
                []
              ),
            ];
          }
          return accumulator;
        }, []);

        setCategoryOptions(extractedItemNames);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };
    const fetchInventoryData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://albadwan.shop/api/cai/res/${restaurantId}`,
          { headers: headers }
        );
        const data = response.data;

        if (!data || !Array.isArray(data)) {
          console.error("Invalid data format:", data);
          return;
        }

        const extractedItemNames = data.reduce((accumulator, category) => {
          if (category.subcategories && Array.isArray(category.subcategories)) {
            category.subcategories.forEach((subcategory) => {
              if (subcategory.menu && Array.isArray(subcategory.menu)) {
                subcategory.menu.forEach((item) => {
                  // Check if item already exists in accumulator
                  const existingItem = accumulator.find(
                    (accItem) => accItem.itemId === item.item_id
                  );
                  if (!existingItem) {
                    accumulator.push({
                      itemId: item.item_id,
                      itemName: item.item_name,
                    });
                  }
                });
              }
            });
          }
          return accumulator;
        }, []);

        setCategoryOptions(extractedItemNames);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };
    fetchInventoryData();
  }, []);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
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
      <div className="mb-1 flex flex-col gap-3 px-8">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Menu Item
        </Typography>

        <Select color="teal" value={Value} onChange={handleSelectChange}>
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
          onChange={handleInputChangeQuantity}
        />
        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
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
          /> */}
      </div>
      <div className=" flex justify-end">
        <Button className="my-3 mx-8" onClick={handleSubmit}>
          Add Item
        </Button>
      </div>
    </form>
  );
}
