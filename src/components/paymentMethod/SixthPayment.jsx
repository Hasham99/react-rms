import React, { useEffect, useState } from "react";
import CashOutTable from "../cashManagement/CashOutTable";
import CashInTable from "../cashManagement/CashInTable";
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

const SixthPayment = () => {
  const [narrationCashIn, setNarrationCashIn] = useState("");
  const [narrationCashOut, setNarrationCashOut] = useState("");
  const [amountCashIn, setAmountCashIn] = useState("");
  const [amountCashOut, setAmountCashOut] = useState("");
  const [cashOutData, setCashOutData] = useState([]);
  const [totalCashOutAmount, setTotalCashOutAmount] = useState(0);
  const [cashInData, setCashInData] = useState([]);
  const [totalCashInAmount, setTotalCashInAmount] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState(0);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://albadwan.shop/api/payment/res/${restaurantId}/get`,
          { headers: headers }
        );
        setPaymentData(response.data[5]);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  useEffect(() => {
    const fetchCashOutData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://albadwan.shop/api/coc/res/${restaurantId}/cashout/get`,
          { headers: headers }
        );
        setCashOutData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchCashInData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://albadwan.shop/api/coc/res/${restaurantId}/cashin/get`,
          { headers: headers }
        );
        setCashInData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCashInData();
    fetchCashOutData();
  }, []);

  useEffect(() => {
    // Filter cashOutData by type and calculate total cash amount
    const sum = cashOutData
      .filter((item) => item.type === paymentData.p_name.toUpperCase())
      .reduce((total, cashOutItem) => total + cashOutItem.amount, 0);
    setTotalCashOutAmount(sum);
  }, [cashOutData]);

  useEffect(() => {
    // Filter cashInData based on type
    const filteredData = cashInData.filter(
      (item) => item.type === paymentData.p_name.toUpperCase()
    );
    // Calculate total cash amount
    const sum = filteredData.reduce(
      (total, cashInItem) => total + cashInItem.amount,
      0
    );
    setTotalCashInAmount(sum);
  }, [cashInData]);

  const handleCashInNarrationChange = (event) => {
    setNarrationCashIn(event.target.value);
  };

  const handleCashInAmountChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value);

    // Check if parsedValue is a valid number and not negative
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setAmountCashIn(parsedValue);
    }
  };
  const handleCashOutNarrationChange = (event) => {
    setNarrationCashOut(event.target.value);
  };

  const handleCashOutAmountChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value);

    // Check if parsedValue is a valid number and not negative
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setAmountCashOut(parsedValue);
    }
  };
  const handleSubmitCheckIn = async () => {
    try {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      const postData = {
        type: paymentData.p_name,
        narration: narrationCashIn,
        amount: amountCashIn,
      };

      // Make a POST request using Axios
      await axios.post(
        `https://albadwan.shop/api/coc/res/${restaurantId}/cashin/create`,
        postData,
        { headers: headers }
      );

      // Reset input values
      setNarrationCashIn("");
      setAmountCashIn("");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error
    }
  };
  const handleSubmitCheckOut = async () => {
    try {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      const postData = {
        type: paymentData.p_name,
        narration: narrationCashOut,
        amount: amountCashOut,
      };
      await axios.post(
        `https://albadwan.shop/api/coc/res/${restaurantId}/cashout/create`,
        postData,
        { headers: headers }
      );

      // Reset input values
      setNarrationCashOut("");
      setAmountCashOut("");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const data = [
    {
      label: "Balance",
      value: "balance",
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
      label: "All Transactions",
      value: "overall",
    },
  ];
  const handleUpdateBalance = async () => {
    try {
      const headers = {
        Authorization: `${BearerToken}`,
        "Content-Type": "application/json",
      };
      await axios
        .patch(
          `https://albadwan.shop/api/payment/res/${restaurantId}/update/${balanceAmount}/${paymentData.p_id}`,
          {},
          { headers: headers }
        )
        .then(
          setTimeout(() => {
            window.location.reload();
          }, 2000)
        );
      // alert(`Balance Amount: ${balanceAmount}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const currency = localStorage.getItem("currency");
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  return (
    <Tabs value="balance">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        <TabPanel value="balance">
          <div className="w-full flex ">
            <Card className="w-1/4 h-fit self-center">
              <CardBody className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <Typography className="font-bold ">
                    {paymentData.p_name ? paymentData.p_name.toUpperCase() : ""}{" "}
                    Account
                  </Typography>
                  <Typography className="font-bold text-blue-500">
                    {paymentData.closing_balance
                      ? parseFloat(paymentData.closing_balance).toFixed(2)
                      : ""}{" "}
                    {currency}
                  </Typography>
                </div>
                <Input
                  style={{ color: "blue" }}
                  // className="text-blue-500 bg-blue-500 "
                  type="number"
                  label="Available Balance"
                  value={
                    paymentData.closing_balance
                      ? parseFloat(paymentData.closing_balance).toFixed(2)
                      : 0
                  }
                />
                <Input
                  type="number"
                  label="Amount"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
                <Button
                  className="w-fit flex px-4 py-3 self-end justify-center bg-green-600"
                  onClick={handleUpdateBalance}
                >
                  Update Balance
                </Button>
              </CardBody>
            </Card>
          </div>
        </TabPanel>

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
            <CashInTable
              type={paymentData.p_name ? paymentData.p_name.toUpperCase() : ""}
            />
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

            <CashOutTable
              type={paymentData.p_name ? paymentData.p_name.toUpperCase() : ""}
            />
          </div>
        </TabPanel>
        <TabPanel value="overall">
          <Card className="">
            <CardBody className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex gap-1 justify-center px-4">
                  <Typography className=" font-bold text-lg uppercase text-green-800">
                    Cash In
                  </Typography>
                  <Typography className=" font-bold text-lg  text-green-800">
                    {`: ${parseFloat(totalCashInAmount).toFixed(2) || 0} `} (
                    {currency})
                  </Typography>
                </div>
                <CashInTable
                  type={
                    paymentData.p_name ? paymentData.p_name.toUpperCase() : ""
                  }
                />
              </div>
              <div>
                <div className="flex gap-1 justify-center px-4">
                  <Typography className=" font-bold text-lg uppercase text-red-800">
                    Cash Out
                  </Typography>
                  <Typography className=" font-bold text-lg  text-red-800">
                    {`: ${parseFloat(totalCashOutAmount).toFixed(2) || 0} `} (
                    {currency})
                  </Typography>
                </div>
                <CashOutTable
                  type={
                    paymentData.p_name ? paymentData.p_name.toUpperCase() : ""
                  }
                />
              </div>
            </CardBody>
          </Card>
        </TabPanel>
      </TabsBody>
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
export default SixthPayment;
