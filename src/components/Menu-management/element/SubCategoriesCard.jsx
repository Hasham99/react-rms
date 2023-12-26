import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  CardBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 "
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const SubCategoriesCard = () => {
  const [size, setSize] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  const handleOpen = (value) => setSize(value);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch("http://54.196.226.78:3000/api/cai");
        const data = await res.json();
        // const allItems = Object.values(data).flatMap(
        //   (category) => category.
        // );
        setCategoryData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryData();
  }, []);

  //   const handleOpen = () => setOpen(!open);
  return (
    <div className="">
      <Card className="w-80 ">
        <CardBody className=" shadow-sm p-4">
          <Typography variant="h4" color="green">
            Sub Categories
          </Typography>
        </CardBody>
        <List>
          {categoryData.map((category) => (
            <div key={category.id}>
              <ListItem ripple={false} className="py-1 pr-1 pl-4">
                {/* {category.category_name} */}
                {category.subcategories.map((sub) => (
                  <div key={sub.subcategory_id}>
                    <p>{sub.subcategory_name}</p>
                  </div>
                ))}
                <ListItemSuffix>
                  <IconButton
                    o
                    onClick={() => handleOpen("lg")}
                    variant="text"
                    color="blue-gray"
                    className="flex justify-center"
                  >
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            </div>
          ))}
        </List>
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
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default SubCategoriesCard;
