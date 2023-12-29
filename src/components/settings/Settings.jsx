import React from "react";
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
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {value === "telegram" ? (
              <Card className="m-2">
                <CardBody>{desc}</CardBody>
              </Card>
            ) : value === "whatsapp" ? (
              <Card className="flex justify-center items-center">
                <CardBody>
                  <Typography variant="h4" color="blue-gray">
                    Sign Up
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                  </Typography>
                  <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Your Name
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Your Email
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Password
                      </Typography>
                      <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center font-normal"
                        >
                          I agree the
                          <a
                            href="#"
                            className="font-medium transition-colors hover:text-gray-900"
                          >
                            &nbsp;Terms and Conditions
                          </a>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth>
                      sign up
                    </Button>
                    <Typography
                      color="gray"
                      className="mt-4 text-center font-normal"
                    >
                      Already have an account?{" "}
                      <a href="#" className="font-medium text-gray-900">
                        Sign In
                      </a>
                    </Typography>
                  </form>
                </CardBody>
              </Card>
            ) : (
              <div>{desc}</div>
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default Settings;
