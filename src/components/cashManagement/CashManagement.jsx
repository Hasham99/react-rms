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
  Alert,
} from "@material-tailwind/react";
import axios from "axios";

const CashManagement = () => {
  const [inputValues, setInputValues] = useState({});
  const [totalDrawerSum, setTotalDrawerSum] = useState(0);
  const [denominationDetails, setDenominationDetails] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertTrue, setShowAlertTrue] = useState(false);
  const [previousTotal, setPreviousTotal] = useState(0);
  const [narrationCashIn, setNarrationCashIn] = useState("");
  const [narrationCashOut, setNarrationCashOut] = useState("");
  const [amountCashIn, setAmountCashIn] = useState("");
  const [amountCashOut, setAmountCashOut] = useState("");

  const handleCashInNarrationChange = (event) => {
    setNarrationCashIn(event.target.value);
  };

  const handleCashInAmountChange = (event) => {
    setAmountCashIn(event.target.value);
  };
  const handleCashOutNarrationChange = (event) => {
    setNarrationCashOut(event.target.value);
  };

  const handleCashOutAmountChange = (event) => {
    setAmountCashOut(event.target.value);
  };
  const handleSubmitCheckIn = async () => {
    try {
      const postData = {
        narration: narrationCashIn,
        amount: amountCashIn,
      };

      // Make a POST request using Axios
      await axios.post(
        `https://albadwan.shop/api/coc/res/${restaurantId}/cashin/create`,
        postData
      );

      // Reset input values
      setNarrationCashIn("");
      setAmountCashIn("");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error
    }
  };
  const handleSubmitCheckOut = async () => {
    try {
      const postData = {
        narration: narrationCashOut,
        amount: amountCashOut,
      };

      // Make a POST request using Axios
      await axios.post(
        `https://albadwan.shop/api/coc/res/${restaurantId}/cashout/create`,
        postData
      );

      // Reset input values
      setNarrationCashOut("");
      setAmountCashOut("");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value);
    setInputValues((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async () => {
    try {
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
      const postData = [];
      for (const [denomination, value] of Object.entries(inputValues)) {
        const denominationDetail = denominationDetails.find(
          (detail) => detail.denom_name === denomination
        );
        if (denominationDetail) {
          const multipliedValue = value;
          postData.push({
            denomKey: denomination,
            denomValue: multipliedValue,
          });
        }
      }
      const jsonData = {
        username: "admin",
        total: totalDrawerSum,
        items: postData,
      };

      await axios.post(
        `https://albadwan.shop/api/coc/res/${restaurantId}/posclosing/create`,
        jsonData
      );
      setShowAlertTrue(true);
      setTimeout(() => {
        setShowAlertTrue(false);
        setInputValues({});
        if (previousTotal !== totalDrawerSum) {
          alert(
            "Previous drawer amount and total drawer amount are not equal!"
          );
        }
        window.location.reload();
        // navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      console.error("Error submitting data:", error);
      // Handle error
    }
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
  const restaurantId = localStorage.getItem("restaurant_id");
  useEffect(() => {
    // Fetch denomination details and set input fields dynamically
    const fetchDenominations = async () => {
      try {
        const response = await fetch(
          `https://albadwan.shop/api/coc/res/${restaurantId}/denom/get`
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
    const fetchPreviousTotal = async () => {
      try {
        const response = await axios.get(
          `https://albadwan.shop/api/coc/res/${restaurantId}/posclosing/get`
        );
        const data = response.data;
        setPreviousTotal(data.total);
      } catch (error) {
        console.error("Error fetching previous total: ", error);
      }
    };

    fetchPreviousTotal();
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
                  Previous Total:{" "}
                  {`${parseFloat(previousTotal).toFixed(2)} (${currency})`}
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
              className="w-28 self-end mx-5 my-4 bg-green-600
              
              "
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
                  Previous Total:{" "}
                  {`${parseFloat(previousTotal).toFixed(2)} (${currency})`}
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
              className="w-28 self-end mx-5 my-4 bg-red-600"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </TabPanel>
        {/* <TabPanel value="close_sale">
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
        </TabPanel> */}
        <TabPanel value="cash_in">
          <div className="flex flex-row gap-2">
            <Card className="w-1/4 h-fit">
              <CardBody className="flex flex-col gap-3">
                <Typography className="font-bold ">Cash In Details</Typography>
                <Input
                  type="text"
                  label="Narration"
                  value={narrationCashIn}
                  onChange={handleCashInNarrationChange}
                />
                <Input
                  type="number"
                  label="Amount"
                  value={amountCashIn}
                  onChange={handleCashInAmountChange}
                />
                <Button
                  className="w-20 flex px-4 py-3 self-end justify-center bg-green-600"
                  onClick={handleSubmitCheckIn}
                >
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
                <Typography className="font-bold ">Cash In Details</Typography>
                <Input
                  type="text"
                  label="Narration"
                  value={narrationCashOut}
                  onChange={handleCashOutNarrationChange}
                />
                <Input
                  type="number"
                  label="Amount"
                  value={amountCashOut}
                  onChange={handleCashOutAmountChange}
                />
                <Button
                  className="w-20 flex px-4 py-3 self-end justify-center bg-red-600"
                  onClick={handleSubmitCheckOut}
                >
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
      {showAlert && (
        <div className="fixed right-7 z-50">
          <Alert
            icon={<Icon />}
            className="transition-opacity rounded-md border-l-4 border-[#ff5252] bg-[#ff5252]/10 font-medium text-[#ff5252]"
          >
            Server Down. Please try again later.
          </Alert>
        </div>
      )}
      {showAlertTrue && (
        <div className="fixed right-7 z-50">
          <Alert
            icon={<Icon />}
            className="transition-opacity rounded-md border-l-4 border-green-500 bg-green-100/80 font-medium text-green-500"
          >
            Request Successful
          </Alert>
        </div>
      )}
    </Tabs>
  );
};
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default CashManagement;
