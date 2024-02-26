import {
  Card,
  Option,
  Select,
  Typography,
  Button,
  CardBody,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

function MenuManagement() {
  const [Kitchen, setKitchen] = useState([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [KitchenData, setKitchenData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [value, setValue] = useState([]);
  const [valueOne, setValueOne] = useState([]);
  const [valueTwo, setValueTwo] = useState([]);
  // const [, setValue] = useState([]);
  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChangeForPrice = (e) => {
    // const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
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

  const jsonData = {
    categoryId: CategoryData,
    subCategoryId: SubCategoryData,
    kitchenId: KitchenData,
    name: formData.itemName,
    price: formData.price,
    description: formData.description,
  };
  const handleChange = (value) => {
    setCategoryData(value.CategoryID);
  };
  const handleChange01 = (value) => {
    setSubCategoryData(value.SubCategoryID);
  };
  const handleChange02 = (value) => {
    setKitchenData(value.KitchenID);
  };
  useEffect(() => {
    // Fetch data from the provided API
    // fetch("http://52.90.182.126:3000/api/cai/v2/")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    const fetchKitchen = async () => {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      await fetch(
        `${import.meta.env.VITE_API_KEY}/api/kitchen/res/${restaurantId}`,
        {
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setKitchen(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const fetchCategory = async () => {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      await fetch(
        `${import.meta.env.VITE_API_KEY}/api/category/res/${restaurantId}`,
        {
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCategory(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const fetchSubCategory = async () => {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      await fetch(
        `${import.meta.env.VITE_API_KEY}/api/subcategory/res/${restaurantId}`,
        {
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSubCategory(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchKitchen();
    fetchCategory();
    fetchSubCategory();
  }, []);

  const handleSubmit = () => {
    const headers = {
      Authorization: `${BearerToken}`,
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${import.meta.env.VITE_API_KEY}/api/items/res/${restaurantId}`,
        jsonData,
        {
          headers,
        }
      )
      .then(() => {
        window.location.href = "/menu-management";
      })
      .catch((error) => {
        alert(error);
      });
  };
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  return (
    <Card className=" m-2">
      <CardBody>
        <div className="grid grid-cols-3 ">
          <div className="p-2">
            <Typography variant="h6">Category</Typography>
            <Select onChange={handleChange} value={value}>
              {Category.map((item) => (
                <Option value={item} key={item.CategoryID}>
                  {item.CategoryName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="p-2">
            <Typography variant="h6">Sub Category</Typography>
            <Select onChange={handleChange01} value={valueOne}>
              {SubCategory.map((item) => (
                <Option value={item} key={item.SubCategoryID}>
                  {item.SubCategoryName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="p-2">
            <Typography variant="h6">Kitchen</Typography>
            <Select onChange={handleChange02} value={valueTwo}>
              {Kitchen.length == null ? (
                <Option key="default" value="default" className="text-red-500">
                  Kitchens not found
                </Option>
              ) : (
                Kitchen.map((kitchen) => (
                  <Option key={kitchen.KitchenID} value={kitchen}>
                    {kitchen.Name}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="p-2">
            <Input
              label="Item Name"
              required
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-2">
            <Textarea
              label="Item Description"
              required
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-2">
            <Input
              label="Item Price"
              required
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChangeForPrice}
            />
          </div>
        </div>
        <div className="p-2 col-span-3  flex justify-end">
          <Button className=" w-24" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
export default MenuManagement;
