import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { AddInventoryItem } from "../Inventory/elements/AddInventoryItem";
import StaffTable from "./elements/StaffTable";
import AddStaff from "./elements/AddStaff";
import { FaRegWindowClose } from "react-icons/fa";

const StaffManagement = () => {
  const [size, setSize] = useState(null);
  const handleClose = () => setSize(null);

  const handleOpen = (value) => setSize(value);

  return (
    <>
      <Card className="w-full ">
        <CardHeader floated={false} shadow={false} className="rounded-none ">
          <div className=" flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Waiter list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all waiters
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => handleOpen("xs")}
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-6 w-4" /> Add member
              </Button>
            </div>
          </div>
        </CardHeader>
        <StaffTable />
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
          <Card color="transparent" shadow={false}>
            <div className="flex justify-between items-center">
              <Typography variant="h4" className="text-sidebar">
                Add New Waiter
              </Typography>
              <div>
                <FaRegWindowClose
                  onClick={handleClose}
                  className="cursor-pointer h-6 w-6 text-red-500"
                />
              </div>
            </div>
            <AddStaff />
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default StaffManagement;
