// import { Button } from "@material-tailwind/react";
import React from "react";

// <div className=" flex p-4 gap-x-3">
//   <Button>Open Sale</Button>
//   <Button>Close Sale</Button>
//   <Button>Cash In</Button>
//   <Button>Cash Out</Button>
// </div>
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";

const CashManagement = () => {
  const data = [
    {
      label: "Open Sale",
      value: "open_sale",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Close Sale",
      value: "close_sale",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Cash In",
      value: "cash_in",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Cash Out",
      value: "cash_out",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Over All",
      value: "overall",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <Tabs value="open_sale">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel value="open_sale">
          {/* <h1 className="text-2xl">No</h1> */}
          <Card className="flex-col">
            <div className="flex items-center justify-between p-5 ">
              <Typography variant="h3" className="">
                Denomination
              </Typography>
              <div className="flex flex-col items-end">
                <Typography className="text-green-500" variant="h6">
                  Total In Drawer: 2100
                </Typography>
                <Typography className="text-blue-500 " variant="h6">
                  Previous Total: 2100
                </Typography>
              </div>
            </div>

            <CardBody className="pt-0 grid grid-cols-3 gap-5 ">
              <div className="flex items-center ">
                <Typography className="text-sm w-40">One's (1)</Typography>
                <Input label="Quantity" type="number" />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Five's (5)</Typography>
                <Input label="Quantity" type="number" />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Ten's (10)</Typography>
                <Input label="Quantity" type="number" />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Twenty's (20)</Typography>
                <Input label="Quantity" type="number" />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Fifty's (50)</Typography>
                <Input label="Quantity" type="number" />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">
                  Hundred's (100)
                </Typography>
                <Input label="Quantity" type="number" />
              </div>
            </CardBody>
          </Card>
          {/* {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))} */}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default CashManagement;
