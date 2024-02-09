import { AddInventoryItem } from "./AddInventoryItem";

import {
  Card,
  IconButton,
  Typography,
  Tooltip,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";

// import { Square2StackIcon } from "@heroicons/react/24/outline";
// import { Tooltip } from "recharts";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { UpdateInventoryItem } from "./UpdateInventoryItem";
import { FaRegWindowClose } from "react-icons/fa";

const TABLE_HEAD = [
  "Product",
  // "Product ID",
  "Category",
  // "Location",
  "Available",
  // "Reserved",
  // "On Hand",
  "Actions",
];

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [getInventoryData, setGetInventoryData] = useState([]);
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const headers = {
          Authorization: `${BearerToken}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `https://albadwan.shop/api/inventory/res/${restaurantId}/get`,
          { headers: headers }
          // `${import.meta.env.VITE_API_KEY}/api/inventory/get`
        );
        const data = await res.json();
        setInventoryData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInventoryData();
  }, []);

  const handleEditClick = async (dataToUpdate) => {
    setGetInventoryData(dataToUpdate);
  };

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  const handleClose = () => setSize(null);
  const restaurantId = localStorage.getItem("restaurant_id");
  const BearerToken = localStorage.getItem("BearerToken");
  return (
    <>
      <Card
        className=" w-full overflow-y-auto"
        // style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((data) => (
              <tr key={data.inventory_id} className="even:bg-blue-gray-50/50 ">
                <td className="px-4 py-0">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.item_name}
                  </Typography>
                </td>
                <td className="px-4 py-0">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.category_name}
                  </Typography>
                </td>
                <td className="px-4 py-0">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.on_hand}
                    {/* {data.available} */}
                  </Typography>
                </td>
                {/* <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.reserved}
                  </Typography>
                </td> */}
                {/* <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.on_hand}
                  </Typography>
                </td> */}
                <td className="px-0 py-0">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <Tooltip content="Edit User">
                      <IconButton
                        variant="text"
                        // onClick={() => handleOpen("sm")}
                        onClick={() => {
                          handleEditClick(data);
                          handleOpen("xs");
                        }}
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete User">
                      <IconButton variant="text">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogBody className="flex justify-center py-5  ">
          <Card color="transparent" shadow={false} className=" py-2">
            <div className="flex justify-between items-center px-8">
              <Typography variant="h4" className="text-sidebar">
                Update Inventory Item
              </Typography>
              <div onClick={handleClose}>
                <FaRegWindowClose className="cursor-pointer h-6 w-6 text-red-500" />
              </div>
            </div>
            <UpdateInventoryItem everything={getInventoryData} />
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default InventoryTable;
