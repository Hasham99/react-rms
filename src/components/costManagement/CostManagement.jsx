import {
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CostManagement = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `https://albadwan.shop/api/recipeitems/res/${restaurantId}/ing`,
          { headers: headers }
          // `${import.meta.env.VITE_API_KEY}/api/recipeitems/ing`
        );
        setAllData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const restaurantId = localStorage.getItem("restaurant_id");
  const currency = localStorage.getItem("currency");
  const BearerToken = localStorage.getItem("BearerToken");
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner color="indigo" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 p-4">
      {allData.map((item) => (
        <Card key={item.MenuItemID} className="m-2 justify-between">
          {/* <CardHeader className="py-3"></CardHeader> */}
          <CardBody className=" bg-gray-50 p-4 rounded-t-lg">
            <Typography
              className="font-bold text-center text-gray-800"
              variant="h5"
            >
              {item.Name}
            </Typography>
          </CardBody>
          {item.ingredients.map((body, index) => (
            <CardBody className=" py-0 flex-1   " key={index}>
              <div className="flex justify-between  py-2">
                <Typography>{body.IngredientName}</Typography>
                <Typography>{body.PricePerGm}</Typography>
              </div>
            </CardBody>
          ))}

          <CardFooter
            className="bg-green-100 rounded-b-lg p-4"
            key={item.MenuItemID}
          >
            <div className="flex justify-between">
              <Typography className="text-center text-gray-800 " variant="h6">
                Cost Price
              </Typography>
              <Typography className="text-center text-gray-800" variant="h6">
                {`${currency} ${item.CostPrice}`}
                {/* {item.CostPrice} */}
              </Typography>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CostManagement;
