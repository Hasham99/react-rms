import React, { useEffect, useState } from "react";
import CashOutTable from "./CashOutTable";
import CashInTable from "./CashInTable";
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
  Button,
} from "@material-tailwind/react";

const CashManagement = () => {
  const [inputValues, setInputValues] = useState({});

  const [totalDrawerSum, setTotalDrawerSum] = useState(0);
  const [denominationDetails, setDenominationDetails] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value);
    setInputValues((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  // const handleSubmit = () => {
  //   const multipliedValues = {};
  //   for (const [denomination, value] of Object.entries(inputValues)) {
  //     const denominationDetail = denominationDetails.find(
  //       (detail) => detail.denom_name === denomination
  //     );
  //     if (denominationDetail) {
  //       multipliedValues[denomination] = value * denominationDetail.digit_value;
  //     }
  //   }
  //   alert(JSON.stringify(multipliedValues));
  // };
  const handleSubmit = () => {
    let total = 0;
    for (const [denomination, value] of Object.entries(inputValues)) {
      const denominationDetail = denominationDetails.find(
        (detail) => detail.denom_name === denomination
      );
      if (denominationDetail) {
        const multipliedValue = value * denominationDetail.digit_value;
        total += multipliedValue;
      }
    }
    setTotalDrawerSum(total);
    alert(JSON.stringify(inputValues) + "\nTotal Drawer Sum: " + total);
  };

  const data = [
    {
      label: "Open Sale",
      value: "open_sale",
    },
    {
      label: "Close Sale",
      value: "close_sale",
    },
    {
      label: "Cash In",
      value: "cash_in",
    },
    {
      label: "Cash Out",
      value: "cash_out",
    },
    {
      label: "Over All",
      value: "overall",
    },
  ];
  const currency = localStorage.getItem("currency");
  // useEffect(() => {
  //   // Calculate total drawer sum based on the latest inputValues state
  //   let sum = 0;
  //   for (const key in inputValues) {
  //     sum += inputValues[key];
  //   }
  //   setTotalDrawerSum(sum);
  // }, [inputValues]);
  useEffect(() => {
    // Fetch denomination details and set input fields dynamically
    const fetchDenominations = async () => {
      try {
        const response = await fetch(
          "https://albadwan.shop/api/coc/res/1/denom/get"
        );
        const data = await response.json();
        setDenominationDetails(data.denomination_details);
        const newInputValues = {};
        data.denomination_details.forEach((denomination) => {
          newInputValues[denomination.denom_name] = 0;
        });
        setInputValues(newInputValues);
      } catch (error) {
        console.error("Error fetching denominations: ", error);
      }
    };

    fetchDenominations();
  }, []);

  useEffect(() => {
    // Calculate total drawer sum based on the latest inputValues state
    let total = 0;
    for (const [denomination, value] of Object.entries(inputValues)) {
      const denominationDetail = denominationDetails.find(
        (detail) => detail.denom_name === denomination
      );
      if (denominationDetail) {
        const multipliedValue = value * denominationDetail.digit_value;
        total += multipliedValue;
      }
    }
    setTotalDrawerSum(total);
  }, [inputValues, denominationDetails]);
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
          <Card className="flex-col">
            <div className="flex items-center justify-between p-5 ">
              <Typography variant="h3" className="">
                Denomination
              </Typography>
              <div className="flex flex-col items-end">
                <Typography className="text-green-500" variant="h6">
                  Total In Drawer:{" "}
                  {`${parseFloat(totalDrawerSum).toFixed(2)} (${currency})`}
                </Typography>
                <Typography className="text-blue-500 " variant="h6">
                  Previous Total: {`${totalDrawerSum} (${currency})`}
                </Typography>
              </div>
            </div>

            <CardBody className="pt-0 grid grid-cols-3 gap-5 ">
              {denominationDetails.map((detail) => (
                <div
                  key={detail.denom_details_id}
                  className="flex items-center"
                >
                  <Typography className="text-sm w-40">
                    {detail.denom_name}
                  </Typography>
                  <Input
                    label="Quantity"
                    type="number"
                    name={detail.denom_name}
                    value={inputValues[detail.denom_name] || 0}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </CardBody>
            <Button
              fullWidth={false}
              className="w-28 self-end mx-5 my-4 bg-[#092635]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </TabPanel>
        <TabPanel value="close_sale">
          <Card className="flex-col">
            <div className="flex items-center justify-between p-5 ">
              <Typography variant="h3" className="">
                Denomination
              </Typography>
              <div className="flex flex-col items-end">
                <Typography className="text-green-500" variant="h6">
                  Total In Drawer:{" "}
                  {`${parseFloat(totalDrawerSum).toFixed(2)} (${currency})`}
                </Typography>
                <Typography className="text-blue-500 " variant="h6">
                  Previous Total: {`${totalDrawerSum} (${currency})`}
                </Typography>
              </div>
            </div>

            <CardBody className="pt-0 grid grid-cols-3 gap-5 ">
              {denominationDetails.map((detail) => (
                <div
                  key={detail.denom_details_id}
                  className="flex items-center"
                >
                  <Typography className="text-sm w-40">
                    {detail.denom_name}
                  </Typography>
                  <Input
                    label="Quantity"
                    type="number"
                    name={detail.denom_name}
                    value={inputValues[detail.denom_name] || 0}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </CardBody>
            <Button
              fullWidth={false}
              className="w-28 self-end mx-5 my-4 bg-[#092635]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </TabPanel>

        {/* <TabPanel value="open_sale">
          <Card className="flex-col">
            <div className="flex items-center justify-between p-5 ">
              <Typography variant="h3" className="">
                Denomination
              </Typography>
              <div className="flex flex-col items-end">
                <Typography className="text-green-500" variant="h6">
                  Total In Drawer: {`${totalDrawerSum} (${currency})`}
                </Typography>
                <Typography className="text-blue-500 " variant="h6">
                  Previous Total: {`${totalDrawerSum} (${currency})`}
                </Typography>
              </div>
            </div>

            <CardBody className="pt-0 grid grid-cols-3 gap-5 ">
              <div className="flex items-center ">
                <Typography className="text-sm w-40">One's (1)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="ones"
                  value={inputValues.ones}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Five's (5)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="fives"
                  value={inputValues.fives}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Ten's (10)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="tens"
                  value={inputValues.tens}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Twenty's (20)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="twenties"
                  value={inputValues.twenties}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Fifty's (50)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="fifties"
                  value={inputValues.fifties}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">
                  Hundred's (100)
                </Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="hundreds"
                  value={inputValues.hundreds}
                  onChange={handleInputChange}
                />
              </div>
            </CardBody>
            <Button
              fullWidth={false}
              className="w-28 self-end mx-5 my-4 bg-[#092635]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </TabPanel> */}
        {/* <TabPanel value="close_sale">
          <Card className="flex-col">
            <div className="flex items-center justify-between p-5 ">
              <Typography variant="h3" className="">
                Denomination
              </Typography>
              <div className="flex flex-col items-end">
                <Typography className="text-green-500" variant="h6">
                  Total In Drawer: {`${totalDrawerSum} (${currency})`}
                </Typography>
                <Typography className="text-blue-500 " variant="h6">
                  Previous Total: {`${totalDrawerSum} (${currency})`}
                </Typography>
              </div>
            </div>

            <CardBody className="pt-0 grid grid-cols-3 gap-5 ">
              <div className="flex items-center ">
                <Typography className="text-sm w-40">One's (1)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="ones"
                  value={inputValues.ones}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Five's (5)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="fives"
                  value={inputValues.fives}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Ten's (10)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="tens"
                  value={inputValues.tens}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Twenty's (20)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="twenties"
                  value={inputValues.twenties}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">Fifty's (50)</Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="fifties"
                  value={inputValues.fifties}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center ">
                <Typography className="text-sm w-40">
                  Hundred's (100)
                </Typography>
                <Input
                  label="Quantity"
                  type="number"
                  name="hundreds"
                  value={inputValues.hundreds}
                  onChange={handleInputChange}
                />
              </div>
            </CardBody>
            <Button
              fullWidth={false}
              className="w-28 self-end mx-5 my-4 bg-[#092635] "
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </TabPanel> */}
        <TabPanel value="cash_in">
          {/* <div className="grid grid-cols-4"> */}
          <div className="flex flex-row gap-2">
            <Card className="w-1/4 h-fit">
              <CardBody className="flex flex-col gap-3">
                <Typography className="font-bold ">Cash In Details</Typography>
                <Input label="Narration" />
                <Input type="number" label="Amount" />
                <Button className="w-20 flex px-4 py-3 self-end justify-center bg-green-600">
                  Submit
                </Button>
              </CardBody>
            </Card>

            <CashInTable />
          </div>
        </TabPanel>
        <TabPanel value="cash_out">
          <div className="flex flex-row gap-2">
            <Card className="w-1/4 h-fit">
              <CardBody className="flex flex-col gap-3">
                <Typography className="font-bold ">Cash Out Details</Typography>
                <Input label="Narration" />
                <Input label="Amount" />
                <Button className="w-20 flex px-4 py-3 self-end justify-center bg-red-600">
                  Submit
                </Button>
              </CardBody>
            </Card>

            <CashOutTable />
          </div>
        </TabPanel>
        <TabPanel value="overall">
          <Card className="">
            <CardBody className="grid grid-cols-2 gap-2">
              <div>
                <Typography className="text-center font-bold text-lg uppercase text-green-800">
                  Cash In
                </Typography>
                <CashInTable />
              </div>
              <div>
                <Typography className="text-center font-bold text-lg uppercase text-red-800">
                  Cash Out
                </Typography>
                <CashOutTable />
              </div>
            </CardBody>
          </Card>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default CashManagement;
