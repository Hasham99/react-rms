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

const AddStaff = () => {
  const [InputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    // name: `${props.product}`,
  });
  const [Value, setValue] = useState();

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeUsername = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChangePass = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeConfirmPass = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (formData.password == formData.confirm_password) {
      //   alert(`
      //   'Waiter Name' ${JSON.stringify(formData.waiter_name)}
      //   'Username' ${JSON.stringify(formData.login_id)}
      //   'password' ${JSON.stringify(formData.password)}`
      // )
      // const newPass = formData.password;
      const jsonData = {
        waiter_name: `${formData.waiter_name}`,
        login_id: `${formData.login_id}`,
        login_pass: `${formData.password}`,
        restaurant_id: 1,
      };
      axios
        .post(`https://albadwan.shop/api/waiter`, jsonData)
        // .post(`${import.meta.env.VITE_API_KEY}/api/waiter`, jsonData)
        .then((response) => {
          console.log("PATCH request successful", response.data);
          // Handle the response data here if needed
        })
        .catch((error) => {
          console.error("Error making PATCH request", error);
          // Handle errors here if needed
        });

      alert(JSON.stringify(jsonData));
    } else {
      alert("password & Confirm pass does not match");
    }

    // // alert(JSON.stringify(jsonData));
    // // Handle the response, e.g., show a success message

    // alert("POST request successful");
  };

  return (
    <Card color="transparent" shadow={false}>
      <div className="flex justify-between items-center">
        <Typography variant="h4" className="text-sidebar">
          Add New Waiter
        </Typography>
        <div>
          <FaRegWindowClose className="cursor-pointer" />
        </div>
      </div>

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
            size="lg"
            placeholder="waiter name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="waiter_name"
            value={formData.waiter_name}
            // value={InputValue.waiter_name}
            // value={InputValue.item_name}
            // value={formData.itemName}
            onChange={handleChangeName}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Username
          </Typography>
          <Input
            required
            size="lg"
            placeholder="waiter username"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="login_id"
            value={formData.login_id}
            // value={InputValue.login_id}
            // value={InputValue.category_name}
            // value={formData.location}
            onChange={handleChangeUsername}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            required
            type=""
            size="lg"
            placeholder="password"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="password"
            // value={}
            value={formData.password}
            onChange={handleInputChangePass}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Confirm Password
          </Typography>
          <Input
            required
            type=""
            size="lg"
            placeholder="confirm password"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="confirm_password"
            // value={}
            value={formData.confirm_password}
            onChange={handleInputChangeConfirmPass}
          />

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
        <Button className="mt-6" fullWidth type="submit">
          Update Item
        </Button>
      </form>
    </Card>
  );
};

export default AddStaff;
