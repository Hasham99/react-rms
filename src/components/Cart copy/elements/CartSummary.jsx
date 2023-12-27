import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
const CartSummary = (props) => {
  // const history = useHistory();
  const amountAfterTax = props.totalAmount + 10;
  const jsonData = {
    time: new Date().toLocaleString(),
    total_amount: amountAfterTax,
    items: props.items,
  };
  const submitData = () => {
    axios
      .post(`http://54.196.226.78:3000/api/posorders/1`, jsonData)
      // .post(`${import.meta.env.VITE_API_KEY}/api/posorders/1`, jsonData)
      .then(() => {
        alert(JSON.stringify(jsonData));
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error making post request", error);
        // Handle errors here if needed
      });
  };
  return (
    <div className="p-2">
      <Card className="bg-gray-100">
        <CardBody>
          <Typography variant="h5" color="blue-gray">
            Cart Summary
          </Typography>
          <div className="py-4">
            <div className="flex justify-between">
              <Typography
                className="py-4 font-light"
                variant="h6"
                color="blue-gray"
              >
                Subtotal
              </Typography>
              <Typography
                className="py-4 font-light"
                variant="h6"
                color="blue-gray"
              >
                {parseFloat(props.totalAmount).toFixed(2)}
              </Typography>
            </div>
            <hr />
            <div className="flex justify-between">
              <Typography
                className="py-4 font-light"
                variant="h6"
                color="blue-gray"
              >
                Tax estimate
              </Typography>
              <Typography
                className="py-4 font-light"
                variant="h6"
                color="blue-gray"
              >
                10$
              </Typography>
            </div>
            <hr />
            <div className="flex justify-between">
              <Typography
                className="py-4 font-Bold"
                variant="h6"
                color="blue-gray"
              >
                Order total
                {/* <hr /> */}
              </Typography>
              <Typography
                className="py-4 font-Bold"
                variant="h6"
                color="blue-gray"
              >
                {parseFloat(props.totalAmount + 10).toFixed(2)}
              </Typography>
            </div>
          </div>
          <Button onClick={submitData} fullWidth>
            Checkout
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CartSummary;
