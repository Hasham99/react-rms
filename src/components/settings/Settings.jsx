import React, { useState } from "react";
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
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { FaTelegramPlane } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { useEffect } from "react";
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
  const [activeKitchen, setActiveKitchen] = useState(null);

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

    fetchKitchenData();
  }, []);

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
        <TabPanel value="telegram">
          {activeKitchen && (
            <Card
              color="transparent"
              shadow={false}
              className="flex justify-center items-center"
            >
              <CardBody className=" shadow-md rounded-md mt-6">
                <Typography variant="h4" color="blue-gray">
                  BOT ID
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  AB6HBEDEX*********
                </Typography>

                <form className="mt-8 mb-2 w-[500px] ">
                  <div className="mb-1 flex-col gap-6  ">
                    {kitchenData.map((kitchen) => (
                      <div
                        key={kitchen.KitchenID}
                        className={`py-3 grid grid-cols-5 items-end `}
                        onClick={() => handleKitchenChange(kitchen)}
                      >
                        <div className="col-span-4 ">
                          <Typography variant="h5">{kitchen.Name}</Typography>
                          <Typography variant="h6">
                            Inctance ID: {kitchen.Name}
                          </Typography>
                          <Typography variant="h6">{kitchen.Name}</Typography>
                          <Typography variant="h6">{kitchen.Name}</Typography>
                          <Typography variant="h6">{kitchen.Name}</Typography>
                          <Input
                            size="lg"
                            placeholder="Group Id"
                            label={kitchen.Name}
                            className=""
                          />
                        </div>
                        <Button className="mx-2">Add</Button>
                      </div>
                    ))}
                    <hr />
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </TabPanel>
        <TabPanel value="whatsapp">
          {activeKitchen && (
            <Card
              color="transparent"
              shadow={false}
              className="flex justify-center items-center"
            >
              <CardBody className="bg-white shadow-md rounded-md mt-6">
                <Typography variant="h4" color="blue-gray">
                  INSTANCE ID
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  AB6HBEDEX*********
                </Typography>

                <form className="mt-8 mb-2 w-[500px]">
                  <div className="mb-1 flex-col gap-6">
                    {kitchenData.map((kitchen) => (
                      <div
                        key={kitchen.KitchenID}
                        className={`py-3 grid grid-cols-5 items-center bg-balck`}
                        onClick={() => handleKitchenChange(kitchen)}
                      >
                        <div className="col-span-4">
                          <Input
                            size="lg"
                            placeholder="Group Id"
                            label={kitchen.Name}
                            className=""
                          />
                        </div>
                        <Button className="mx-2">Add</Button>
                      </div>
                    ))}
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </TabPanel>

        {/* : value === "whatsapp" ? (
             <Card 
          //     color="transparent"
          //     shadow={false}
          //     className="flex justify-center items-center"
          //   >
          //     <CardBody className="bg-white shadow-md rounded-md mt-6">
          //       <Typography variant="h4" color="blue-gray">
          //         INSTANCE ID
          //       </Typography>
          //       <Typography color="gray" className="mt-1 font-normal">
          //         AB6HBEDEXX978ED67E6
          //       </Typography>
          //       <form className="mt-8 mb-2 w-[500px]">
          //         <div className="mb-1 flex-col gap-6">
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 01
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 02
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 03
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 04
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 05
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 06
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //           <div className="py-3 grid grid-cols-5 items-center bg-balck ">
          //             <Typography
          //               variant="h6"
          //               color="blue-gray"
          //               className=" w-32 "
          //             >
          //               Kitchen 07
          //             </Typography>
          //             <div className="col-span-3">
          //               <Input
          //                 size="lg"
          //                 placeholder="name@mail.com"
          //                 className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          //                 labelProps={{
          //                   className:
          //                     "before:content-none after:content-none",
          //                 }}
          //               />
          //             </div>
          //             <Button className="mx-2">Add</Button>
          //           </div>
          //         </div>
          //       </form>
          //     </CardBody>
          //   </Card>
          // ) : (
          //   <div>{desc}</div>
          // )}
          // </TabPanel>
        // )
        // )}*/}
      </TabsBody>
    </Tabs>
  );
};
export default Settings;
