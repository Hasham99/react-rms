import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { parse } from "date-fns";
import { useState, useEffect } from "react";

const ItemIngredients = () => {
  const [ItemName, setItemName] = useState([]);
  //   const [PriceOne, setPriceOne] = useState([]);
  const [PriceOne, setPriceOne] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceTwo, setPriceTwo] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceThree, setPriceThree] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceFour, setPriceFour] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceFive, setPriceFive] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceSix, setPriceSix] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceSeven, setPriceSeven] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [PriceEight, setPriceEight] = useState({
    IngredientID: null,
    IngredientName: "",
    PricePerGm: null,
  });
  const [value, setValue] = useState([]);
  const [newValue, setNewValue] = useState([]);
  const [MenuItem, setMenuItem] = useState([]);
  const [IngredientName, setIngredientName] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    IngredientName: "",
    PricePerGm: "",
  });
  const [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchItemName = async () => {
      await fetch(`${import.meta.env.VITE_API_KEY}/api/items/recipewise`)
        .then((response) => response.json())
        .then((data) => {
          setItemName(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const fetchIngredientName = async () => {
      await fetch(`${import.meta.env.VITE_API_KEY}/api/ingredients/`)
        .then((response) => response.json())
        .then((data) => {
          setIngredientName(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchItemName();
    fetchIngredientName();
  }, []);
  const handleChange = (newValue) => {
    setMenuItem(newValue.MenuItemID);
    // console.log(newValue.MenuItemID);
  };
  const handleChange01 = (value) => {
    setPriceOne(value);
  };
  const handleChange02 = (value) => {
    setPriceTwo(value);
  };
  const handleChange03 = (value) => {
    setPriceThree(value);
  };
  const handleChange04 = (value) => {
    setPriceFour(value);
  };
  const handleChange05 = (value) => {
    setPriceFive(value);
  };
  const handleChange06 = (value) => {
    setPriceSix(value);
  };
  const handleChange07 = (value) => {
    setPriceSeven(value);
  };
  const handleChange08 = (value) => {
    setPriceEight(value);
  };
  const totalPrice = parseFloat(
    (parseFloat(PriceOne.PricePerGm) || 0) *
      (parseFloat(formData.itemName01) || 0) +
      (parseFloat(PriceTwo.PricePerGm) || 0) *
        (parseFloat(formData.itemName02) || 0) +
      (parseFloat(PriceThree.PricePerGm) || 0) *
        (parseFloat(formData.itemName03) || 0) +
      (parseFloat(PriceFour.PricePerGm) || 0) *
        (parseFloat(formData.itemName04) || 0) +
      (parseFloat(PriceFive.PricePerGm) || 0) *
        (parseFloat(formData.itemName05) || 0) +
      (parseFloat(PriceSix.PricePerGm) || 0) *
        (parseFloat(formData.itemName06) || 0) +
      (parseFloat(PriceSeven.PricePerGm) || 0) *
        (parseFloat(formData.itemName07) || 0) +
      (parseFloat(PriceEight.PricePerGm) || 0) *
        (parseFloat(formData.itemName08) || 0)
  ).toFixed(4);

  const jsonData = {
    MenuItemID: `${MenuItem}`,
    CostPrice: `${totalPrice}`,
    items: [],
  };
  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_API_KEY}/api/recipeitems`, jsonData)
      .then(() => {
        alert(JSON.stringify(jsonData));
        window.location.href = "/ingredients";
      })
      .catch((error) => {
        console.error("Error making post request", error);
        alert(error);
        // Handle errors here if needed
      });
  };
  useEffect(() => {
    if (formData.itemName01) {
      jsonData.items.push({
        IngredientID: `${PriceOne.IngredientID}`,
        PerItemPrice: `${PriceOne.PricePerGm}`,
        Grams: `${PriceOne.PricePerGm * formData.itemName01}`,
      });
    }
    if (formData.itemName02) {
      jsonData.items.push({
        IngredientID: `${PriceTwo.IngredientID}`,
        PerItemPrice: `${PriceTwo.PricePerGm}`,
        Grams: `${PriceTwo.PricePerGm * formData.itemName02}`,
      });
    }
    if (formData.itemName03) {
      jsonData.items.push({
        IngredientID: `${PriceThree.IngredientID}`,
        PerItemPrice: `${PriceThree.PricePerGm}`,
        Grams: `${PriceThree.PricePerGm * formData.itemName03}`,
      });
    }
    if (formData.itemName04) {
      jsonData.items.push({
        IngredientID: `${PriceFour.IngredientID}`,
        PerItemPrice: `${PriceFour.PricePerGm}`,
        Grams: `${PriceFour.PricePerGm * formData.itemName04}`,
      });
    }
    if (formData.itemName05) {
      jsonData.items.push({
        IngredientID: `${PriceFive.IngredientID}`,
        PerItemPrice: `${PriceFive.PricePerGm}`,
        Grams: `${PriceFive.PricePerGm * formData.itemName05}`,
      });
    }
    if (formData.itemName06) {
      jsonData.items.push({
        IngredientID: `${PriceSix.IngredientID}`,
        PerItemPrice: `${PriceSix.PricePerGm}`,
        Grams: `${PriceSix.PricePerGm * formData.itemName06}`,
      });
    }
    if (formData.itemName07) {
      jsonData.items.push({
        IngredientID: `${PriceSeven.IngredientID}`,
        PerItemPrice: `${PriceSeven.PricePerGm}`,
        Grams: `${PriceSeven.PricePerGm * formData.itemName07}`,
      });
    }
    if (formData.itemName08) {
      jsonData.items.push({
        IngredientID: `${PriceEight.IngredientID}`,
        PerItemPrice: `${PriceEight.PricePerGm}`,
        Grams: `${PriceEight.PricePerGm * formData.itemName08}`,
      });
    }
  }, [formData]);

  return (
    <div className="grid grid-cols-2">
      <Card className="m-4 p-2  ">
        <CardBody>
          <Typography variant="h4" className="text-center text-gray-800">
            Add Item Ingredients{" "}
            <span className="text-yellow-900">{totalPrice}</span>
          </Typography>
          <div className="">
            <div className="">
              <div className="">
                <Typography variant="h6" className=" text-gray-800">
                  Item Name
                </Typography>
                <Select onChange={handleChange} value={newValue}>
                  {ItemName.map((data) => (
                    <Option value={data} key={data.MenuItemID}>
                      {data.Name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="grid grid-cols-2 pt-5">
                {/* 1 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange01} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {
                          isNaN(PriceOne.PricePerGm)
                            ? 0
                            : parseFloat(PriceOne.PricePerGm).toFixed(4)
                          // parseFloat(PriceOne.PricePerGm).toFixed(4) || 0
                        }
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceOne.PricePerGm * formData.itemName01
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName01"
                      value={formData.itemName01}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 2 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange02} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceTwo.PricePerGm).toFixed(4)}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceTwo.PricePerGm * formData.itemName02
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName02"
                      value={formData.itemName02}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 3 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange03} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceThree.PricePerGm).toFixed(4)}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceThree.PricePerGm * formData.itemName03
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName03"
                      value={formData.itemName03}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 4 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange04} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceFour.PricePerGm).toFixed(4)}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceFour.PricePerGm * formData.itemName04
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName04"
                      value={formData.itemName04}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 5 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange05} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceFive.PricePerGm).toFixed(4)}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceFive.PricePerGm * formData.itemName05
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName05"
                      value={formData.itemName05}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 6 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange06} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceSix.PricePerGm).toFixed(4)}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceSix.PricePerGm * formData.itemName06
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName06"
                      value={formData.itemName06}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 7 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange07} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceSeven.PricePerGm).toFixed(4)}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceSeven.PricePerGm * formData.itemName07
                        ).toFixed(4)}
                      </span>
                    </Typography>
                    <Input
                      name="itemName07"
                      value={formData.itemName07}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>

                {/* 8 */}
                <div className="mx-2">
                  <Typography variant="h6" className=" text-gray-800">
                    Ingredient Name
                  </Typography>
                  <Select onChange={handleChange08} value={value}>
                    {/* <Option>Select ingredient</Option> */}
                    {IngredientName.map((data) => (
                      <Option value={data} key={data.IngredientID}>
                        {data.IngredientName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mx-2 ">
                  <div>
                    <Typography variant="h6" className=" text-gray-800">
                      Quantity{" "}
                      <span className="text-red-600">
                        {parseFloat(PriceEight.PricePerGm).toFixed(4) || 0}
                      </span>{" "}
                      <span className="text-green-600">
                        {parseFloat(
                          PriceEight.PricePerGm * formData.itemName08
                        ).toFixed(4) || 0}
                      </span>
                    </Typography>
                    <Input
                      name="itemName08"
                      value={formData.itemName08}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="in gram"
                    ></Input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Add
        </Button>
      </Card>
    </div>
  );
};

export default ItemIngredients;
