import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CostManagement = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    // const fetchItemCostManagement = async () => {
    //   await fetch(" http://52.90.182.126:3000/api/recipeitems/ing")
    //     .then((data) => {
    //       setAllData(data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data:", error);
    //     });
    // };
    // fetchItemCostManagement();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://52.90.182.126:3000/api/recipeitems/ing"
        );
        setAllData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-4 p-4">
      {/* <div>
        <h1>Recipe List</h1>
        <ul>
          {allData.map((recipe, index) => (
            <li key={index}>
              <strong>{recipe.Name}</strong>
              <ul>
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>
                    {ingredient.IngredientName}: $
                    {ingredient.PricePerGm.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div> */}
      {allData.map((item) => (
        <Card key={item.MenuItemID} className="m-2 ">
          {/* <CardHeader className="py-3"></CardHeader> */}
          <CardBody className=" ">
            <Typography className="text-center " variant="h4">
              {item.Name}
            </Typography>
          </CardBody>
          {item.ingredients.map((body, index) => (
            <CardBody className="  py-1 " key={index}>
              <div className="flex justify-between pt-2">
                <Typography>{body.IngredientName}</Typography>
                <Typography>{body.PricePerGm}</Typography>
              </div>
            </CardBody>
          ))}

          <CardFooter className="" key={item.MenuItemID}>
            <div className="flex justify-between">
              <Typography className="text-center " variant="h4">
                Cost Price
              </Typography>
              <Typography className="text-center " variant="h4">
                {item.CostPrice}
              </Typography>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CostManagement;
