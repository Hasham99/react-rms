import {
  Card,
  IconButton,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

// import { Square2StackIcon } from "@heroicons/react/24/outline";
// import { Tooltip } from "recharts";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

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

// const TABLE_ROWS = [
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
//   {
//     name: "John Michael",
//     id: "Warehouse 1",
//     category: "Fast food",
//     location: "Warehouse 1",
//     available: "120",
//     reserved: "80",
//     onhand: "100",
//     actions: "actions",
//     icons: {},
//   },
// ];

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const res = await fetch("http://52.90.182.126:3000/api/inventory");
        const data = await res.json();
        setInventoryData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInventoryData();
  }, []);
  return (
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
                    <IconButton variant="text">
                      <PencilSquareIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Edit User">
                    <IconButton variant="text">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </td>
            </tr>
          ))}

          {/* {TABLE_ROWS.map(
            (
              { name, id, category, location, available, reserved, onhand },
              index
            ) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {category}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {location}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {available}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {reserved}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {onhand}
                  </Typography>
                </td>
                <td className="p-2">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <PencilSquareIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </td>
              </tr>
            )
          )} */}
        </tbody>
      </table>
    </Card>
  );
};

export default InventoryTable;
