import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateStaff = (props) => {
  const [InputValue, setInputValue] = useState(props.everything);
  const [formData, setFormData] = useState({
    name: "",
    // name: `${props.product}`,
  });
  const [Value, setValue] = useState();

  const handleChange = (value) => {
    setValue(value);
  };
  const handleInputChangeTwo = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const jsonData = {
    waiter_name: `${InputValue.waiter_name}`,
    login_id: `${InputValue.login_id}`,
    login_pass: `${formData.password}`,
    restaurant_id: `${InputValue.restaurant_id}`,
    status: `${Value}`,
  };

  const handleSubmit = () => {
    const headers = {
      Authorization: `${BearerToken}`,
      "Content-Type": "application/json",
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_KEY}/api/waiter/${InputValue.waiter_id}`,
        jsonData,
        { headers: headers }
      )
      .then((response) => {
        console.log("PATCH request successful", response.data);
        // alert("POST request successful");
        window.location.reload();
        // Handle the response data here if needed
      })
      .catch((error) => {
        console.error("Error making PATCH request", error);
        alert("error", error);
        // Handle errors here if needed
      });
  };
  const BearerToken = localStorage.getItem("BearerToken");
  return (
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
      <div className="mb-1 flex flex-col gap-3">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Name
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
          value={InputValue.waiter_name}
          // value={InputValue.item_name}
          // value={formData.itemName}
          // onChange={handleInputChange}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Username
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
          value={InputValue.login_id}
          // value={InputValue.category_name}
          // value={formData.location}
          // onChange={handleInputChange}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Password
        </Typography>
        <Input
          required
          type=""
          size="lg"
          placeholder="Update Password"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="password"
          // value={}
          value={formData.password}
          onChange={handleInputChangeTwo}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          <div className="flex justify-between ">
            <div>Status</div>
            <div className="text-green-400 text-sm ">
              {/* {InputValue.reserved} */}
            </div>
          </div>
        </Typography>
        <Select onChange={handleChange} value={Value}>
          <Option value="allowed">Allowed</Option>
          <Option value="disallowed">Not Allowed</Option>
        </Select>
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
        Update Item
      </Button>
    </form>
  );
};

export default UpdateStaff;
