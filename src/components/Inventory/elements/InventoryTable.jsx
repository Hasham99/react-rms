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

const TABLE_HEAD = [
  "Product",
  // "Product ID",
  "Category",
  // "Location",
  "Available",
  "Reserved",
  "On Hand",
  "Actions",
];

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [getInventoryData, setGetInventoryData] = useState([]);
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const res = await fetch(
          `http://54.196.226.78:3000/api/inventory/get`
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
  return (
    <>
      <Card className=" w-full overflow-scroll">
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
              <tr key={data.inventory_id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.item_name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.category_name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.available}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.reserved}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.on_hand}
                  </Typography>
                </td>
                <td className="p-2">
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
                          handleOpen("sm");
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
        <DialogBody className="flex justify-center ">
          <UpdateInventoryItem
            everything={getInventoryData}
            // product={getInventoryData.item_name}
            // category={getInventoryData.category_name}
            // available={getInventoryData.available}
            // reserved={getInventoryData.reserved}
            // onhand={getInventoryData.item_name}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default InventoryTable;
