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
      await fetch(`https://albadwan.shop/api/kitchen/res/${restaurantId}`, {
        headers,
      })
        // await fetch(`${import.meta.env.VITE_API_KEY}/api/kitchen`)
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
      await fetch(`https://albadwan.shop/api/category/res/${restaurantId}`, {
        headers,
      })
        // await fetch(`${import.meta.env.VITE_API_KEY}/api/category`)
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
      await fetch(`https://albadwan.shop/api/subcategory/res/${restaurantId}`, {
        headers,
      })
        // await fetch(`${import.meta.env.VITE_API_KEY}/api/subcategory`)
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
      .post(`https://albadwan.shop/api/items/res/${restaurantId}`, jsonData, {
        headers,
      })
      // .post(`https://albadwan.shop/api/items`, jsonData)
      // .post(`http://54.196.226.78:3000/api/items`, jsonData)
      // .post(`${import.meta.env.VITE_API_KEY}/api/items`, jsonData)
      .then(() => {
        window.location.href = "/menu-management";
        // Handle the response data here if needed
      })
      .catch((error) => {
        // console.error("Error making post request", error);
        // Handle errors here if needed
        alert(error);
      });
    // alert(JSON.stringify(jsonData));
    // alert(`${selectedOptionOne} ${selectedOptionTwo} ${selectedOptionThree}`);
  };
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  return (
    // <div>
    //   <h1>Filter Item Names by Subcategory</h1>
    //   <label>Select a subcategory: </label>
    //   <Select
    //     value={selectedSubcategoryId}
    //     onChange={(e) => setSelectedSubcategoryId(parseInt(e.target.value))}
    //   >
    //     <Option value={null}>-- All Subcategories --</Option>
    //     {data.map((subcategory) => (
    //       <option
    //         key={subcategory.subcategory_id}
    //         value={subcategory.subcategory_id}
    //       >
    //         {subcategory.subcategory_name}
    //       </option>
    //     ))}
    //   </Select>
    //   <h2>Filtered Item Names:</h2>
    //   <ul>
    //     {filteredItemNames.map((itemName, index) => (
    //       <li key={index}>{itemName}</li>
    //     ))}
    //   </ul>
    // </div>
    <Card className=" m-2">
      {/* <CardBody className="m-2"> */}

      {/* <div className="flex flex-row">
        <div className="p-4">
          <Typography variant="h5" className="py-2 text-sidebar">
            Category
          </Typography>
          <Select
            color="teal"
            value={selectedOptionOne}
            onChange={handleSelectChangeOne}
            label="Select Category"
          >
            {Category.map((data) => (
              <Option key={data.CategoryID}>{data.CategoryName}</Option>
            ))}
          </Select>
        </div>
        <div className="p-4">
          <Typography variant="h5" className="py-2 text-sidebar">
            Sub Category
          </Typography>
          <Select
            color="teal"
            // value={selectedOptionTwo}
            onChange={handleSelectChangeTwo}
            value={newValue}
            label="Select SubCategory"
          >
            {SubCategory.map((data) => (
              <Option value={data} key={data.SubCategoryID}>
                {data.SubCategoryName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="p-4">
          <Typography variant="h5" className="py-2 text-sidebar">
            Kitchen
          </Typography>
          <Select
            color="teal"
            // value={selectedOptionThree}
            onChange={handleSelectChangeThree}
            label="Select Kitchen"
          >
            {Kitchen.map((data) => (
              <Option key={data.KitchenID}>{data.Name}</Option>
            ))}
          </Select>
        </div>
      </div> */}
      <CardBody>
        <div className="grid grid-cols-4 ">
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
              {/* {Kitchen.map((item) => (
                <Option value={item} key={item.KitchenID}>
                  {item.Name}
                </Option>
              ))} */}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4">
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
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardBody>
      <Button onClick={handleSubmit}>Submit</Button>

      {/* </CardBody> */}
    </Card>
  );
}
export default MenuManagement;
