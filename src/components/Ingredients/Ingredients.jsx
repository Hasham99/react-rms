import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";

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
  ).toFixed(5);

  const jsonData01 = {
    item_name: `${formData.itemName01}`,
    item_weight: `${formData.itemWeight01}`,
    item_price: `${formData.itemAmount01}`,
    item_price_per_gram: `${ItemPerGram01}`,
  };
  const ItemPerGram02 = parseFloat(
    parseFloat(formData.itemAmount02) / parseFloat(formData.itemWeight02)
  ).toFixed(5);

  const jsonData02 = {
    item_name: `${formData.itemName02}`,
    item_weight: `${formData.itemWeight02}`,
    item_price: `${formData.itemAmount02}`,
    item_price_per_gram: `${ItemPerGram02}`,
  };

  const handleSubmit01 = () => {
    alert(JSON.stringify(jsonData01));
  };
  const handleSubmit02 = () => {
    alert(JSON.stringify(jsonData02));
  };
  return (
    <>
      <div className="grid grid-cols-2 ">
        <Card className="m-4">
          <CardBody>
            <Typography variant="h3" className="text-blue-gray-800 text-center">
              Add Ingredient (Kg)
            </Typography>
            <div className="grid grid-cols-2">
              <div className="p-2">
                <Typography variant="h5">Item Name</Typography>
                <Input
                  name="itemName01"
                  type="text"
                  value={formData.itemName01}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2"></div>
              <div className="p-2">
                <Typography variant="h5">Write in Kg</Typography>
                <Input
                  name="itemWeight01"
                  type="number"
                  value={formData.itemWeight01}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2">
                <Typography variant="h5">Total Amount</Typography>
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
                  {formData.itemAmount01 / (formData.itemWeight01 * 1000)}
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
            <Typography variant="h3" className="text-blue-gray-800 text-center">
              Add Ingredient (g)
            </Typography>
            <div className="grid grid-cols-2">
              <div className="p-2">
                <Typography variant="h5">Item Name</Typography>
                <Input
                  name="itemName02"
                  type="text"
                  value={formData.itemName02}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2"></div>
              <div className="p-2">
                <Typography variant="h5">Write in g</Typography>
                <Input
                  name="itemWeight02"
                  type="number"
                  value={formData.itemWeight02}
                  onChange={handleInputChange}
                />
              </div>

              <div className="p-2">
                <Typography variant="h5">Total Amount</Typography>
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
                  Per Gram: {formData.itemAmount02 / formData.itemWeight02}
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
    </>
  );
};

export default Ingredients;
