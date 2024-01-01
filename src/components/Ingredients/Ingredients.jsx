import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import ItemIngredients from "./elements/ItemIngredients";
import axios from "axios";
import { useHref } from "react-router-dom";

const Ingredients = () => {
  // const [inputValue, setInputValue] = useState(null);

  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler to update the state when the input value changes
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const ItemPerGram01 = parseFloat(
    parseFloat(formData.itemAmount01) /
      (parseFloat(formData.itemWeight01) * 1000)
  ).toFixed(4);

  const jsonData01 = {
    IngredientName: `${formData.itemName01}`,
    PricePerGm: `${ItemPerGram01}`,
  };
  const ItemPerGram02 = parseFloat(
    parseFloat(formData.itemAmount02) / parseFloat(formData.itemWeight02)
  ).toFixed(4);

  const jsonData02 = {
    // item_name: `${formData.itemName02}`,
    // item_weight: `${formData.itemWeight02}`,
    // item_price: `${formData.itemAmount02}`,
    // item_price_per_gram: `${ItemPerGram02}`,
    IngredientName: `${formData.itemName02}`,
    PricePerGm: `${ItemPerGram02}`,
  };

  const handleSubmit01 = () => {
    axios
      .post(`https://albadwan.shop/api/ingredients`, jsonData01)
      // .post(`${import.meta.env.VITE_API_KEY}/api/ingredients`, jsonData01)
      .then(() => {
        // console.log("Post request successful", response.data);
        setFormData({
          ...formData,
          itemName01: "", // Clear the item name field
          itemWeight01: "", // Clear the item weight field
          itemAmount01: "", // Clear the total amount field
        });
        window.location.href = "/ingredients";
        // alert(JSON.stringify(jsonData01));
        // Handle the response data here if needed
      })
      .catch((error) => {
        console.error("Error making post request", error);
        // Handle errors here if needed
      });
  };

  const handleSubmit02 = () => {
    axios
      .post(`https://albadwan.shop/api/ingredients`, jsonData02)
      // .post(`${import.meta.env.VITE_API_KEY}/api/ingredients`, jsonData01)
      .then(() => {
        // console.log("Post request successful", response.data);
        setFormData({
          ...formData,
          itemName02: "", // Clear the item name field
          itemWeight02: "", // Clear the item weight field
          itemAmount02: "", // Clear the total amount field
        });
        window.location.href = "/ingredients";
        // alert(JSON.stringify(jsonData01));
        // Handle the response data here if needed
      })
      .catch((error) => {
        console.error("Error making post request", error);
        // Handle errors here if needed
      });
  };
  return (
    <>
      <div className="grid grid-cols-2 ">
        <Card className="m-4">
          <CardBody>
            <Typography variant="h4" className="text-blue-gray-800 text-center">
              Add Ingredient (Kg)
            </Typography>
            <div className="grid grid-cols-2">
              <div className="p-2">
                <Typography variant="h6">Item Name</Typography>
                <Input
                  name="itemName01"
                  type="text"
                  value={formData.itemName01}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2"></div>
              <div className="p-2">
                <Typography variant="h6">Write in Kg</Typography>
                <Input
                  name="itemWeight01"
                  type="number"
                  value={formData.itemWeight01}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2">
                <Typography variant="h6">Total Amount</Typography>
                <Input
                  name="itemAmount01"
                  type="number"
                  value={formData.itemAmount01}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-center py-4">
              <div>
                {/* <div>In Gram: {inputValue * 1000}</div> */}
                <div>
                  Per Gram:{" "}
                  {/* {inputValue.itemAmount01 / (inputValue.itemWeight01 * 1000)} */}
                  {parseFloat(
                    formData.itemAmount01 / (formData.itemWeight01 * 1000)
                  ).toFixed(4)}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  handleSubmit01();
                }}
              >
                Add
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card className="m-4">
          <CardBody>
            <Typography variant="h4" className="text-blue-gray-800 text-center">
              Add Ingredient (g)
            </Typography>
            <div className="grid grid-cols-2">
              <div className="p-2">
                <Typography variant="h6">Item Name</Typography>
                <Input
                  name="itemName02"
                  type="text"
                  value={formData.itemName02}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2"></div>
              <div className="p-2">
                <Typography variant="h6">Write in g</Typography>
                <Input
                  name="itemWeight02"
                  type="number"
                  value={formData.itemWeight02}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2">
                <Typography variant="h6">Total Amount</Typography>
                <Input
                  name="itemAmount02"
                  type="number"
                  value={formData.itemAmount02}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-center py-4">
              <div>
                {/* <div>In Gram: {inputValue * 1000}</div> */}
                <div>
                  Per Gram:{" "}
                  {parseFloat(
                    formData.itemAmount02 / formData.itemWeight02
                  ).toFixed(4)}
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
              <Button
                onClick={() => {
                  handleSubmit02();
                }}
              >
                Add
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <ItemIngredients />
    </>
  );
};

export default Ingredients;
