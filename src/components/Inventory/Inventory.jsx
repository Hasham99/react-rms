import {
  Button,
  Card,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

import InventoryTable from "./elements/InventoryTable";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { AddInventoryItem } from "./elements/AddInventoryItem";
import { FaRegWindowClose } from "react-icons/fa";

const Inventory = () => {
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  const handleClose = () => setSize(null);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-2xl text-[#092635] font-bold py-4">Inventory</div>
        {/* <div className=" "> */}
        <Button
          onClick={() => handleOpen("sm")}
          className="flex items-center gap-3"
          size="md"
        >
          <UserPlusIcon strokeWidth={10} className="h-5 w-5" /> Add item
        </Button>
        {/* </div> */}
      </div>
      {/* <div className="text-md font-normal py-1">Inventory</div> */}
      <InventoryTable />
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
                Add Inventory Item
              </Typography>
              {/* // onClick={handleClose} */}
              <div onClick={handleClose}>
                <FaRegWindowClose className="cursor-pointer h-6 w-6 text-red-500" />
              </div>
            </div>
            <AddInventoryItem />
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
};
export default Inventory;
