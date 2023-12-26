import React, { useState, useEffect } from "react";
import { addToCart } from "../../../redux/CartSlice";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

function ProductsPOS() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(`http://54.196.226.78:3000/api/cai/v3/`)
        // await fetch(`${import.meta.env.VITE_API_KEY}/api/cai/v3/`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data); // Assuming your API response is an array of items
        })
        .catch((error) => {
          console.error("Error fetching data from API", error);
        });
    };
    fetchProduct();
  }, []);
  const handleCart = (product) => {
    // alert(JSON.stringify(product));
    dispatch(addToCart(product));
    // localStorage.setItem("cartitems", JSON.stringify(product));
  };

  return (
    <Card className="h-screen max-h-[85vh] overflow-y-scroll ">
      {/* <div className=" h-screen rounded-xl  grid grid-cols-3 overflow-y-scroll bg-white px-4  max-h-[85vh]  "> */}
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      ></CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          Products
        </Typography>
        <div className="grid grid-cols-6">
          {products.map((subcategory) => (
            <div key={subcategory.subcategory_id}>
              {subcategory.items.map((item) => (
                <div
                  key={item.item_id}
                  onClick={() => handleCart(subcategory)}
                  className="flex-wrap cursor-pointer h-20 block my-4 w-36 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
                >
                  <div className="flex justify-between">
                    <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900">
                      {item.item_name}
                    </h5>
                    {/* <br /> */}
                    <p className="font-normal text-gray-700 ">
                      {item.item_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
export default ProductsPOS;
