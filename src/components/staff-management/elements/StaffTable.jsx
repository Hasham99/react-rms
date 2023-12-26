import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AddInventoryItem } from "../../Inventory/elements/AddInventoryItem";
import UpdateStaff from "./UpdateStaff";

const StaffTable = () => {
  const TABLE_HEAD = ["Name", "Username", "Password", "Status", ""];

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  const [staffData, setStaffData] = useState([]);
  const [getStaffData, setGetStaffData] = useState([]);
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const res = await fetch(`http://54.196.226.78:3000/api/waiter`);
        // const res = await fetch(`${import.meta.env.VITE_API_KEY}/api/waiter`);
        const data = await res.json();
        setStaffData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStaffData();
  }, []);
  const handleEditClick = async (dataToUpdate) => {
    setGetStaffData(dataToUpdate);
  };
  return (
    <div>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
            {staffData.map((item) => (
              <tr key={item.waiter_id}>
                <td className={"p-4"}>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.waiter_name}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={"pl-4"}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.login_id}
                    </Typography>
                  </div>
                </td>
                <td className={"pl-4"}>
                  <div className="w-max">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      ******
                    </Typography>
                  </div>
                </td>
                <td className={" pl-4"}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.status}
                  </Typography>
                </td>
                <td className={"pl-4"}>
                  <Tooltip content="Edit User">
                    <IconButton
                      variant="text"
                      onClick={() => {
                        handleEditClick(item);
                        handleOpen("sm");
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
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
          <UpdateStaff everything={getStaffData} />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default StaffTable;
