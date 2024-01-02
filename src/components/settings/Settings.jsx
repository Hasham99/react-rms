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

const Settings = () => {
  const data = [
    {
      label: "Profile",
      value: "profile",
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
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  const [value, setValue] = useState([]);

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

    fetchTimeZones();
  }, []);

  const handleTimeZoneChange = (value) => {
    setSelectedTimeZone(value.tz_name);
  };

  const handleSaveButtonClick = () => {
    alert(`Selected Time Zone: ${selectedTimeZone}`);
  };
  return (
    <Tabs value="profile">
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
        <TabPanel value="profile">
          <Card color="transparent" shadow={false} className="h-screen">
            {/* <div className="flex w-full ">
              <div className="flex-col rounded-md bg-white m-2 p-6 w-1/3 h-56 space-y-4">
                <Typography className="text-xl font-bold  text-gray-900">
                  Time-Zone
                </Typography>
                <div>
                  {" "}
                  <Typography className="text-md font-meduim  text-gray-800">
                    Time Zone
                  </Typography>
                  <Select>
                    <Option></Option>
                  </Select>
                </div>
                <Button>Save</Button>
              </div>
              <div className="bg-white m-2 w-2/3 h-96"></div>
            </div> */}
            <div className="grid grid-cols-3  h-4/5">
              <div className="bg-white m-2 p-6 space-y-4 rounded-md max-h-56">
                <Typography className="text-xl font-bold  text-gray-900">
                  Time-Zone
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
                <Typography className="text-xl font-bold  text-gray-900">
                  Currency
                </Typography>
                <div>
                  {" "}
                  <Typography className="text-md font-meduim  text-gray-800">
                    Select Currency
                  </Typography>
                  <Select>
                    <Option></Option>
                  </Select>
                </div>
                <Button className="bg-[#092635]">Save</Button>
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
