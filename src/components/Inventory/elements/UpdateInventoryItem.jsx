import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export function UpdateInventoryItem(props) {
  // Define state variables to store form data

  const [InputValue, setInputValue] = useState(props.everything);
  const [formData, setFormData] = useState({
    name: "",
    // name: `${props.product}`,
  });
  const Availability =
    parseInt(formData.available) + parseInt(InputValue.available);
  const ReservedItems =
    parseInt(formData.reserved) + parseInt(InputValue.reserved);
  // Event handler for input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onHand = parseInt(Availability) + parseInt(ReservedItems);

  const handleInputChangeTwo = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async () => {
    const onHand = parseInt(InputValue.on_hand);
    const AvailableQty = parseInt(formData.available);
    const AddBoth = onHand + AvailableQty;
    const jsonData = {
      menuitem_id: `${InputValue.menuitem_id}`,
      // category_id: `${InputValue.category_id}`,
      // available: `${Availability}`,
      // reserved: `${ReservedItems}`,
      // on_hand: `${onHand}`,
      // on_hand: `${onHand}+${AvailableQty}`,
      on_hand: `${AddBoth}`,
    };
    // Make a POST request to your server endpoint
    await axios
      .patch(
        `https://albadwan.shop/api/inventory/res/${restaurantId}/update`,
        jsonData
      )
      // .patch(`${import.meta.env.VITE_API_KEY}/api/inventory/update`, jsonData)
      .then(() => {
        window.location.reload();
        // console.log("PATCH request successful", response.data);
        // Handle the response data here if needed
        // alert("POST request successful");
      })
      .catch((error) => {
        alert("Error making PATCH request", error);
        // Handle errors here if needed
      });
    // alert(JSON.stringify(InputValue.on_hand));
  };
  const restaurantId = localStorage.getItem("restaurant_id");
  return (
    <form
      className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
      onSubmit={() => {
        try {
          handleSubmit;
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {/* // <> */}
      <div className="mb-1 flex flex-col gap-3">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Item Name
        </Typography>
        <Input
          required
          disabled
          size="lg"
          placeholder="Item name"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="itemName"
          value={InputValue.item_name}
          // value={formData.itemName}
          onChange={handleInputChange}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Category
        </Typography>
        <Input
          required
          disabled
          size="lg"
          placeholder="category"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="category"
          value={InputValue.category_name}
          // value={formData.location}
          onChange={handleInputChange}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          <div className="flex justify-between ">
            <div>Available</div>
            <div className="text-green-400 text-sm ">{InputValue.on_hand}</div>
          </div>
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
          // value={}
          value={formData.available}
          onChange={handleInputChangeTwo}
        />
        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
          <div className="flex justify-between ">
            <div>Reserved</div>
            <div className="text-green-400 text-sm ">{InputValue.reserved}</div>
          </div>
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
          // value={InputValue.reserved}
          value={formData.reserved}
          onChange={handleInputChangeTwo}
        /> */}
        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
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
          /> */}
      </div>
      <Button className="mt-6" fullWidth onClick={handleSubmit}>
        {/* <Button className="mt-6" fullWidth type="submit"> */}
        Update Item
      </Button>
      {/* </> */}{" "}
    </form>
  );
}
