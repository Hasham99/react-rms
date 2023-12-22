import {
  Card,
  Option,
  Select,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

function MenuManagement() {
  const [data, setData] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [filteredItemNames, setFilteredItemNames] = useState([]);
  const [Kitchen, setKitchen] = useState([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [selectedOptionOne, setSelectedOptionOne] = useState([]);
  const [selectedOptionTwo, setSelectedOptionTwo] = useState([]);
  const [selectedOptionThree, setSelectedOptionThree] = useState([]);

  useEffect(() => {
    // Fetch data from the provided API
    // fetch("http://52.90.182.126:3000/api/cai/v2/")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

    const fetchKitchen = async () => {
      await fetch("http://52.90.182.126:3000/api/kitchen")
        .then((response) => response.json())
        .then((data) => {
          setKitchen(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const fetchCategory = async () => {
      await fetch("http://52.90.182.126:3000/api/category")
        .then((response) => response.json())
        .then((data) => {
          setCategory(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const fetchSubCategory = async () => {
      await fetch("http://52.90.182.126:3000/api/subcategory")
        .then((response) => response.json())
        .then((data) => {
          setSubCategory(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchKitchen();
    fetchCategory();
    fetchSubCategory();
  }, []);

  useEffect(() => {
    // Filter item names based on selected subcategory_id
    if (selectedSubcategoryId !== null) {
      const selectedSubcategory = data.find(
        (subcategory) => subcategory.subcategory_id === selectedSubcategoryId
      );

      if (selectedSubcategory) {
        const itemNames = selectedSubcategory.items.map(
          (item) => item.item_name
        );
        setFilteredItemNames(itemNames);
      } else {
        setFilteredItemNames([]);
      }
    } else {
      // If no subcategory is selected, show all item names
      const itemNames = data.flatMap((subcategory) =>
        subcategory.items.map((item) => item.item_name)
      );
      setFilteredItemNames(itemNames);
    }
  }, [selectedSubcategoryId, data]);

  const handleSelectChangeOne = (selectedOptionOne) => {
    setSelectedOptionOne(selectedOptionOne);
  };
  const handleSelectChangeTwo = (selectedOption) => {
    setSelectedOptionTwo(selectedOption);
  };
  const handleSelectChangeThree = (selectedOption) => {
    setSelectedOptionThree(selectedOption);
  };
  const handleSubmit = () => {
    alert(`${selectedOptionOne} ${selectedOptionTwo} ${selectedOptionThree}`);
  };
  return (
    // <div>
    //   <h1>Filter Item Names by Subcategory</h1>
    //   <label>Select a subcategory: </label>
    //   <Select
    //     value={selectedSubcategoryId}
    //     onChange={(e) => setSelectedSubcategoryId(parseInt(e.target.value))}
    //   >
    //     <Option value={null}>-- All Subcategories --</Option>
    //     {data.map((subcategory) => (
    //       <option
    //         key={subcategory.subcategory_id}
    //         value={subcategory.subcategory_id}
    //       >
    //         {subcategory.subcategory_name}
    //       </option>
    //     ))}
    //   </Select>
    //   <h2>Filtered Item Names:</h2>
    //   <ul>
    //     {filteredItemNames.map((itemName, index) => (
    //       <li key={index}>{itemName}</li>
    //     ))}
    //   </ul>
    // </div>
    <Card className=" m-2">
      {/* <CardBody className="m-2"> */}
      <form
        className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={() => {
          // Prevent the form submission for this example
          try {
            handleSubmit();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <div className="flex flex-row">
          <div className="p-4">
            <Typography variant="h5" className="py-2 text-sidebar">
              Category
            </Typography>
            <Select
              color="teal"
              value={selectedOptionOne}
              onChange={handleSelectChangeOne}
              label="Select Category"
            >
              {Category.map((data) => (
                <Option key={data.CategoryID}>{data.CategoryName}</Option>
              ))}
            </Select>
          </div>
          <div className="p-4">
            <Typography variant="h5" className="py-2 text-sidebar">
              Sub Category
            </Typography>
            <Select
              color="teal"
              // value={selectedOptionTwo}
              onChange={handleSelectChangeTwo}
              label="Select SubCategory"
            >
              {SubCategory.map((data) => (
                <Option key={data.SubCategoryID}>{data.SubCategoryName}</Option>
              ))}
            </Select>
          </div>
          <div className="p-4">
            <Typography variant="h5" className="py-2 text-sidebar">
              Kitchen
            </Typography>
            <Select
              color="teal"
              // value={selectedOptionThree}
              onChange={handleSelectChangeThree}
              label="Select Kitchen"
            >
              {Kitchen.map((data) => (
                <Option key={data.KitchenID}>{data.Name}</Option>
              ))}
            </Select>
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {/* </CardBody> */}
    </Card>
  );
}
export default MenuManagement;
