import React, { useRef, useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Input,
  Typography,
  Button,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import axios from "axios";

const Settings = () => {
  const data = [
    {
      label: "Basic Setup",
      value: "basic_setup",
      icon: UserCircleIcon,
      desc: `Because it's about motivating the doers. Because I'm here
              to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Telegram",
      value: "telegram",
      icon: FaTelegramPlane,
      desc: `It really matters and then like it really doesn't matter.
              What matters is the people who are sparked by it. And the people
              who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Whatsapp",
      value: "whatsapp",
      icon: RiWhatsappFill,
      desc: `We're not always in the position that we want to be at.
              We're constantly growing. We're constantly making mistakes. We're
              constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  const handleKitchenChange = (kitchen) => {
    setActiveKitchen(kitchen);
  };
  const [kitchenData, setKitchenData] = useState([]);
  const [instanceId, setInstanceId] = useState([]);
  const [activeKitchen, setActiveKitchen] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [jsonData, setJsonData] = useState([]);
  const [timeZones, setTimeZones] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [payment, setPayment] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [value, setValue] = useState([]);
  const [valueCurr, setValueCurr] = useState([]);
  const [valuePay, setValuePay] = useState([]);
  const [name, setName] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [tax, setTax] = useState(null);
  const [enteredTax, setEnteredTax] = useState(null); // State to store entered tax percentage
  const [enteredPayment, setEnteredPayment] = useState(""); // State to store entered Payment

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://albadwan.shop/api/timezones/res/1"
        );
        const data = response.data;

        // Extract values from the response and set them in state
        if (data && data.timezone && data.timezone.length > 0) {
          const timezoneData = data.timezone[0];

          setName(timezoneData.name);
          setDefaultCurrency(timezoneData.default_currency);
          setTimeZone(timezoneData.time_zone);
          setTax(timezoneData.tax);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // const fetchCurrencyData = async () => {
    //   try {
    //     const response = await axios.get("https://albadwan.shop/api/currency");
    //     const data = response.data;

    //     // Extract values from the response and set them in state
    //     if (data && data.timezone && data.timezone.length > 0) {
    //       const timezoneData = data.timezone[0];

    //       setName(timezoneData.name);
    //       setDefaultCurrency(timezoneData.default_currency);
    //       setTimeZone(timezoneData.time_zone);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // Call the fetch function
    fetchData();
    // fetchCurrencyData();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    // Fetch kitchen data from the API
    const fetchKitchenData = async () => {
      try {
        const response = await fetch("https://albadwan.shop/api/kitchen/res/1");
        const data = await response.json();
        setKitchenData(data);
        setActiveKitchen(data[0]); // Set the first kitchen as active by default
      } catch (error) {
        console.error("Error fetching kitchen data:", error);
      }
    };
    const InstanceId = async () => {
      try {
        const response = await fetch("https://albadwan.shop/api/whatsapp");
        const data = await response.json();
        setInstanceId(data);
        // setActiveKitchen(data[0]); // Set the first kitchen as active by default
      } catch (error) {
        console.error("Error fetching kitchen data:", error);
      }
    };

    fetchKitchenData();
    InstanceId();
  }, []);
  const handleInputChange = (kitchenId, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [kitchenId]: value,
    }));
  };
  const handleAddButtonClick = () => {
    // Assuming activeKitchen is the currently selected kitchen
    if (activeKitchen) {
      const kitchenId = activeKitchen.KitchenID;
      const inputValue = inputValues[kitchenId] || "";
      const updatedJsonData = {
        ...jsonData,
        [kitchenId]: inputValue,
      };
      setJsonData(updatedJsonData);
      alert(`Kitchen ID: ${kitchenId}, Input Value: ${inputValue}`);

      // Clear the input value after adding
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [kitchenId]: "",
      }));
    }
  };
  const inputRef = useRef();

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch("https://albadwan.shop/api/timezones");
        const data = await response.json();
        setTimeZones(data);
        // console.log(JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };
    const fetchCurrency = async () => {
      try {
        const response = await fetch("https://albadwan.shop/api/currency");
        const data = await response.json();
        setCurrency(data);
        // console.log(JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };
    const fetchPayment = async () => {
      try {
        const response = await fetch(
          "https://albadwan.shop/api/payment/res/1/get"
        );
        const data = await response.json();
        setPayment(data);
        // console.log(JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };

    fetchTimeZones();
    fetchCurrency();
    fetchPayment();
  }, []);

  const handleTimeZoneChange = (value) => {
    setSelectedTimeZone(value.tz_name);
  };

  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value.currency_code);
  };

  const handlePaymentChange = (value) => {
    setSelectedPayment(value.p_name);
  };

  const handleSaveButtonClick = async () => {
    // Check if a time zone is selected
    if (selectedTimeZone) {
      const jsonData = {
        time_zone: `${selectedTimeZone}`,
      };

      // Make the PATCH request
      await axios
        .patch(`https://albadwan.shop/api/timezones/1`, jsonData)
        .then(() => {
          // Alert after successful request
          alert(`Selected Time Zone: ${selectedTimeZone}`);

          // Clear the input values and selected time zone
          setInputValues({});
          setValue([]);
          setSelectedTimeZone("");
          // Reload the window
          window.location.reload();
        })
        .catch((error) => {
          alert("Error", error);
        });
    } else alert("Select Time Zone before saving ");
  };
  const handleSaveButtonClick01 = async () => {
    // Check if a time zone is selected
    if (selectedCurrency) {
      const jsonData = {
        currency: `${selectedCurrency}`,
      };

      // Make the PATCH request
      await axios
        .patch(`https://albadwan.shop/api/currency/1`, jsonData)
        .then(() => {
          // Alert after successful request
          alert(`Selected Currency: ${selectedCurrency}`);
          localStorage.setItem("currency", selectedCurrency);

          // Clear the input values and selected time zone
          setInputValues({});
          setValueCurr([]);
          setSelectedCurrency("");
          // Reload the window
          window.location.reload();
        })
        .catch((error) => {
          alert("Error", error);
        });
    } else alert("Select Currency before saving ");
  };
  const handleSaveButtonClick02 = async () => {
    if (enteredTax) {
      const jsonData = {
        tax: `${enteredTax}`,
      };
      // Make the PATCH request
      await axios
        .patch(`https://albadwan.shop/api/tax/res/1/update`, jsonData)
        .then(() => {
          setEnteredTax(null);
          window.location.reload();
        })
        .catch((error) => {
          alert("Error", error);
        });
    } else alert("Tax can't be empty ");
  };
  const handleSaveButtonClick03 = async () => {
    if (enteredPayment) {
      const jsonData = {
        p_name: `${enteredPayment}`,
      };
      // alert(JSON.stringify(jsonData));
      // Make the PATCH request
      await axios
        .post(`https://albadwan.shop/api/payment/res/1/create`, jsonData)
        .then(() => {
          setEnteredPayment(null);
          window.location.reload();
        })
        .catch((error) => {
          alert("Error", error);
        });
    } else alert("Payment Type can't be empty ");
  };
  const handleTaxInputChange = (e) => {
    setEnteredTax(e.target.value);
  };
  const handlePaymentInputChange = (e) => {
    setEnteredPayment(e.target.value);
  };
  return (
    <Tabs value="basic_setup">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel value="whatsapp">
          {activeKitchen && (
            <Card
              color="transparent"
              shadow={false}
              className="flex justify-center items-center"
            >
              <CardBody className="bg-white shadow-md rounded-lg mt-6 py-10">
                <div className=" shadow-md rounded-lg p-4 text-center">
                  <Typography variant="h4" color="blue-gray">
                    Access Token
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    AB6HBEDEX*********
                  </Typography>
                </div>
                <div className="flex flex-col p-4 h-20 my-2 rounded-lg justify-center shadow-md">
                  <Typography
                    className="text-center"
                    variant="h4"
                    color="blue-gray"
                  >
                    Instance Token
                  </Typography>
                  <div className=" grid grid-cols-4 my-1 gap-1">
                    {instanceId.map((item) => (
                      <Typography key={item.instance_id} className="  ">
                        {
                          <div>
                            <span className="font-bold">
                              {item.instance_id}
                              {". "}
                            </span>
                            <span className="font-medium">
                              {`${item.instance_number.substring(0, 7)}****`}
                            </span>
                          </div>
                        }
                      </Typography>
                    ))}
                  </div>
                </div>

                <form className=" mb-2 w-[500px]">
                  <div className="mb-1 flex-col gap-6">
                    {kitchenData.map((kitchen) => (
                      <div
                        key={kitchen.KitchenID}
                        className={`py-3 grid grid-cols-5 items-end my-4  p-2 `}
                        onClick={() => handleKitchenChange(kitchen)}
                      >
                        <div className="col-span-4">
                          <Input
                            size="lg"
                            placeholder="Group Id"
                            label={kitchen.Name}
                            className=""
                            value={inputValues[kitchen.KitchenID] || ""}
                            onChange={(e) =>
                              handleInputChange(
                                kitchen.KitchenID,
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <Button
                          className="mx-2"
                          onClick={() => handleAddButtonClick()}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </TabPanel>
        <TabPanel value="basic_setup">
          <Card color="transparent" shadow={false} className="h-screen">
            <div className="grid grid-cols-3  h-4/5">
              <div className="bg-white m-2 p-6 space-y-4 rounded-md max-h-56">
                <Typography className="text-xl font-bold flex items-center justify-between  text-gray-900">
                  Time-Zone{" "}
                  <span className="text-base font-medium text-green-600">
                    {timeZone}
                  </span>
                </Typography>
                <div>
                  {" "}
                  <Typography className="text-md font-meduim  text-gray-800">
                    Select Time Zone
                  </Typography>
                  <Select value={value} onChange={handleTimeZoneChange}>
                    {timeZones.map((zone) => (
                      <Option key={zone.tz_id} value={zone}>
                        {zone.tz_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button
                  className="bg-[#092635]"
                  onClick={handleSaveButtonClick}
                  // disabled={!selectedTimeZone}
                >
                  Save
                </Button>
              </div>
              {/* <div className="bg-white m-2 col-span-2 h-96 rounded-md"></div> */}
              <div className="bg-white m-2 p-6 space-y-4 rounded-md max-h-56">
                <Typography className="text-xl font-bold  text-gray-900 flex items-center justify-between  ">
                  Currency
                  <span className="text-base font-medium text-green-600 ">
                    {defaultCurrency}
                  </span>
                </Typography>
                <div>
                  {" "}
                  <Typography className="text-md font-meduim  text-gray-800 ">
                    Select Currency
                  </Typography>
                  <Select value={valueCurr} onChange={handleCurrencyChange}>
                    {currency.map((currency) => (
                      <Option key={currency.currency_id} value={currency}>
                        {currency.currency_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button
                  onClick={handleSaveButtonClick01}
                  className="bg-[#092635]"
                >
                  Save
                </Button>
              </div>

              <div className="bg-white m-2 p-6 space-y-4 rounded-md max-h-56">
                <Typography className="text-xl font-bold  text-gray-900 flex items-center justify-between  ">
                  Tex percentage
                  <span className="text-base font-medium text-green-600 ">
                    {tax}%
                  </span>
                </Typography>
                <div>
                  {" "}
                  <Typography className="text-md font-meduim  text-gray-800 ">
                    Select Tax
                  </Typography>
                  <Input
                    placeholder="Tax percentage (%)"
                    required
                    type="number"
                    value={enteredTax}
                    onChange={handleTaxInputChange}
                  />
                </div>
                <Button
                  onClick={handleSaveButtonClick02}
                  className="bg-[#092635]"
                >
                  Save
                </Button>
              </div>

              <div className="bg-white m-2 p-6 space-y-4 rounded-md max-h-80">
                <Typography className="text-xl font-bold  text-gray-900 flex items-center justify-between  ">
                  Add Payment
                  {/* <span className="text-base font-medium text-green-600 ">
                    {defaultCurrency}
                  </span> */}
                </Typography>
                <div>
                  <Typography className=" text-md font-meduim  text-gray-800 ">
                    Available
                  </Typography>
                  <Select value={valuePay} onChange={handlePaymentChange}>
                    {payment.map((payment) => (
                      <Option key={payment.p_id} value={payment}>
                        {payment.p_name}
                      </Option>
                    ))}
                  </Select>
                  <Typography className="mt-3 text-md font-meduim  text-gray-800 ">
                    Add New
                  </Typography>
                  <Input
                    placeholder="Add new payment"
                    required
                    type="text"
                    value={enteredPayment}
                    onChange={handlePaymentInputChange}
                  />
                </div>
                <Button
                  onClick={handleSaveButtonClick03}
                  className="bg-[#092635]"
                >
                  Save
                </Button>
              </div>
              {/* <div className="bg-white"></div> */}
            </div>
          </Card>
        </TabPanel>
        <TabPanel value="telegram">
          {activeKitchen && (
            <Card
              color="transparent"
              shadow={false}
              className="flex justify-center items-center"
            >
              <CardBody className="bg-white shadow-md rounded-lg mt-6 py-10">
                <div className=" shadow-md rounded-lg p-4 text-center">
                  <Typography variant="h4" color="blue-gray">
                    BOT ID
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    AB6HBEDEX*********
                  </Typography>
                </div>

                <form className=" mb-2 w-[500px]">
                  <div className="mb-1 flex-col gap-6">
                    {kitchenData.map((kitchen) => (
                      <div
                        key={kitchen.KitchenID}
                        className={`py-3 grid grid-cols-5 items-end my-4  p-2 `}
                        onClick={() => handleKitchenChange(kitchen)}
                      >
                        <div className="col-span-4">
                          <Input
                            size="lg"
                            placeholder="Group Id"
                            label={kitchen.Name}
                            className=""
                            value={inputValues[kitchen.KitchenID] || ""}
                            onChange={(e) =>
                              handleInputChange(
                                kitchen.KitchenID,
                                e.target.value
                              )
                            }
                            ref={inputRef} // Add this line to attach the ref
                          />
                        </div>
                        <Button
                          className="mx-2"
                          onClick={() => handleAddButtonClick()}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};
export default Settings;
