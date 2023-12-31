import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { addToCart } from "../../../../redux/CartSlice";
import { useDispatch } from "react-redux";

const POSDialog = (props) => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };
  const [ItemData, setItemData] = useState(props.itemDetails);
  const [isDialogOpen, setDialogOpen] = useState(true); // State to control dialog visibility

  const handleSubmit = () => {
    const jsonData = {
      // item: {
      menuitemID: ItemData.item.item_id,
      name: ItemData.item.item_name,
      price: ItemData.item.item_price,
      quantity: parseInt(formData),
      kitchenID: ItemData.item.kitchen_id,
      categoryID: ItemData.subcategory_id,
      note: "",
      // },
    };
    // alert(JSON.stringify(jsonData));
    dispatch(addToCart(jsonData));
    // Close the dialog
    setDialogOpen(false);
  };

  return (
    <Card color="transparent" shadow={false}>
      <div className="text-center">
        <Typography variant="h4" className=" text-sidebar">
          Enter Quantity
        </Typography>
      </div>

      <Typography variant="h6" color="blue-gray" className="">
        Quantity
      </Typography>
      <Input
        required
        type="number"
        size="lg"
        placeholder="Quantity"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        // name="quantity"
        value={formData}
        onChange={handleInputChange}
      />
      <Button onClick={handleSubmit} className="mt-6" fullWidth type="submit">
        Add Item
      </Button>
    </Card>
  );
};

export default POSDialog;
