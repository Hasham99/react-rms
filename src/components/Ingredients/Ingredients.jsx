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
  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
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

  const ItemPerGram01 = parseFloat(
    parseFloat(formData.itemAmount01) /
      (parseFloat(formData.itemWeight01) * 1000)
  ).toFixed(4);

  //  total amount (250) / (2 * 1000)grams

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
    if (formData.itemName01 && formData.itemWeight01 && formData.itemAmount01) {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      axios
        .post(
          `${import.meta.env.VITE_API_KEY}/api/ingredients/res/${restaurantId}`,
          jsonData01,
          { headers }
        )
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
    } else {
      alert("fields can not be empty");
    }
  };

  const handleSubmit02 = () => {
    if (formData.itemName02 && formData.itemWeight02 && formData.itemAmount02) {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      axios
        .post(
          `${import.meta.env.VITE_API_KEY}/api/ingredients/res/${restaurantId}`,
          jsonData02,
          { headers }
        )
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
    } else {
      alert("fields can not be empty");
    }
  };
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
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
                  {isNaN(
                    parseFloat(
                      formData.itemAmount01 / (formData.itemWeight01 * 1000)
                    )
                  )
                    ? 0
                    : parseFloat(
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
                  {isNaN(
                    parseFloat(formData.itemAmount02 / formData.itemWeight02)
                  )
                    ? 0
                    : parseFloat(
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
