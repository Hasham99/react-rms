import { Card, CardBody, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";

const Ingredients = () => {
  const [inputValue, setInputValue] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  // Event handler to update the state when the input value changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputChangeTwo = (e) => {
    setTotalCost(e.target.value);
  };
  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-4 ">
          <div></div>
          <div className="p-2">
            <Typography variant="h5">Write in Kg</Typography>
            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-2">
            <Typography variant="h5">Total Amount</Typography>
            <Input
              type="number"
              value={totalCost}
              onChange={handleInputChangeTwo}
            />
          </div>
        </div>
        <div className="flex justify-center py-4">
          <div>
            <div>In Gram: {inputValue * 1000}</div>
            <div>Per Gram: {totalCost / (inputValue * 1000)}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Ingredients;
