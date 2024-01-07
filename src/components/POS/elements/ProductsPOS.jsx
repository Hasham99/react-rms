import {
  Card,
  CardBody,
  Typography,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Dialog,
  DialogBody,
  Input,
  // Select,
  // Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addToCart } from "../../../redux/CartSlice";
import { useDispatch } from "react-redux";

// import POSDialog from "./ProductDialog/POSDialog";

const ProductsPOS = () => {
  const [formData, setFormData] = useState(null);
  const [Note, setNote] = useState("");
  const [itemExtras, setItemExtras] = useState([]);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };
  const handleInputChange01 = (e) => {
    setNote(e.target.value);
  };
  const handleListItemClick = (extra) => {
    setItemExtras((prevExtras) => {
      // Check if the extra is already selected
      const isExtraSelected = prevExtras.some(
        (selectedExtra) => selectedExtra.extras_id === extra.extras_id
      );

      if (isExtraSelected) {
        // If the extra is already selected, remove it
        return prevExtras.filter(
          (selectedExtra) => selectedExtra.extras_id !== extra.extras_id
        );
      } else {
        // If the extra is not selected, add it
        return [...prevExtras, extra];
      }
    });
  };
  const handleSubmit = () => {
    const jsonData = {
      // item: {
      menuitemID: itemData.item.item_id,
      name: itemData.item.item_name,
      price: itemData.item.item_price,
      quantity: parseInt(formData),
      kitchenID: itemData.item.kitchen_id,
      categoryID: itemData.subcategory_id,
      itemExtras: itemExtras,
      note: `${Note}`,
    };
    dispatch(addToCart(jsonData));
    // console.log(jsonData);
    setFormData("");
    setNote("");
    setItemExtras([]);
    handleClose();
  };

  const [categories, setCategories] = useState([]);
  const [itemData, setItemData] = useState([]);

  const handleClick = (item, category) => {
    handleOpen("xs");
    const jsonData = {
      subcategory_id: category.subcategory_id,
      item: item,
    };
    // alert(JSON.stringify(jsonData));
    setItemData(jsonData);
    // console.log(itemData.item.extras);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://albadwan.shop/api/cai/v2/res/1`);
        const data = await response.json();
        // localStorage.setItem("products", JSON.stringify(data));
        // const data1 = localStorage.getItem("products");
        // (data1);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // setCategories(JSON.parse(localStorage.getItem("products")));
    fetchData();
  }, []);
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);
  const handleClose = () => setSize(null); // Function to close the dialog
  const currency = localStorage.getItem("currency");
  return (
    <>
      <Card>
        <CardBody>
          <Typography className="font-bold text-2xl text-gray-800">
            Products
          </Typography>
          {categories.map((category) => (
            <div key={category.subcategory_id}>
              <div className="border-t border-gray-400 py-3 my-2 ">
                <Typography className="text-lg font-bold text-green-600">
                  {category.subcategory_name}
                </Typography>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.item_id}
                    className="space-y-1 border-r-2 border-green-600 p-4 rounded-md bg-white shadow-md cursor-pointer"
                    onClick={() => {
                      handleClick(item, category);
                    }}
                  >
                    <Typography className="text-[14px] font-semibold">
                      {item.item_name}
                    </Typography>
                    <p className="text-gray-600 text-[14px]">
                      {currency} {item.item_price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardBody>
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
        size={size || "sm"}
        handler={handleOpen}
      >
        <DialogBody className="px-7 py-8 max-h-[85vh]">
          {/* <POSDialog itemDetails={itemData} /> */}
          <Card className="space-y-2" color="transparent" shadow={false}>
            <div className="text-center">
              <Typography variant="h4" className="pb-4 text-left text-sidebar">
                Product Details
              </Typography>
            </div>

            <Typography variant="h6" color="" className="font-normal">
              Quantity
            </Typography>
            <Input
              required={true}
              type="number"
              size="md"
              placeholder="Quantity"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-600"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formData}
              onChange={handleInputChange}
            />
            <Typography variant="h6" color="" className="font-normal">
              Note
            </Typography>
            <Input
              required
              type="text"
              size="md"
              placeholder="Add Note"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-600"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={Note}
              onChange={handleInputChange01}
            />
            {itemData &&
              itemData.item &&
              itemData.item.extras &&
              itemData.item.extras.length > 0 && (
                <Typography
                  variant="h6"
                  color=""
                  className="font-normal pt-2 pb-0"
                >
                  Add Extras
                </Typography>
              )}

            {itemData &&
              itemData.item &&
              itemData.item.extras &&
              itemData.item.extras.length > 0 && (
                <List className="p-0">
                  {/* Iterate through itemData.item.extras and render a ListItem for each extras_name */}
                  {itemData.item.extras.map((extra) => (
                    <ListItem key={extra.extras_id} className="p-0">
                      <label
                        htmlFor={`extra-${extra.extras_id}`}
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Checkbox
                            id={`extra-${extra.extras_id}`}
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }}
                            onChange={() => handleListItemClick(extra)}
                          />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="font-medium">
                          {extra.extras_name}
                        </Typography>
                      </label>
                    </ListItem>
                  ))}
                </List>
              )}
          </Card>
          <div
          // className="flex justify-center items-end"
          >
            <Button
              onClick={handleSubmit}
              className="mt-6 bg-sidebar "
              // fullWidth
              type="submit"
            >
              Add to Cart
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProductsPOS;
