import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

export function AddInventoryItem(props) {
  // Define state variables to store form data
  const [formData, setFormData] = useState({
    name: "",
  });

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input type
    //     if (type === "checkbox") {
    //   setFormData({
    //     ...formData,
    //     [name]: checked,
    //   });
    //     } else {
    // if (name === "itemName" && typeof value === "string") {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = () => {
    // alert(formData);
    // if (formData.itemName === "string") {
    alert(
      `${formData.itemName} ${formData.location} ${formData.available} ${formData.reserved} ${formData.onHand} `
    );
    // } else {
    //   {
    //     ;
    //   }
    // }
  };
  const { handleClose } = props;
  return (
    <Card color="transparent" shadow={false}>
      <div className="flex justify-between items-center">
        <Typography variant="h4" className="text-sidebar">
          Add Inventory Item
        </Typography>
        {/* <Link to={`/inventory`}> */}
        <div onClick={handleClose}>
          <FaRegWindowClose className="cursor-pointer" />
        </div>
        {/* </Link> */}
      </div>
      {/* <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography> */}
      <form
        className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={() => {
          try {
            handleSubmit();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {/* <div className="grid grid-cols-2 "> */}
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Item Name
          </Typography>
          <Input
            required
            size="lg"
            placeholder="Item name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Location
          </Typography>
          <Input
            required
            size="lg"
            placeholder="location"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="location"
            value={formData.location}
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
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            On Hand
          </Typography>
          <Input
            required
            type="number"
            size="lg"
            placeholder="on Hand Quantity"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="onHand"
            value={formData.onHand}
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
