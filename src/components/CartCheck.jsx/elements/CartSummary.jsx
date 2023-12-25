import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

const CartSummary = () => {
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
                {/* {parseFloat(props.totalAmount).toFixed(2)} */}
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
                {/* {parseFloat(props.totalAmount + 10).toFixed(2)} */}
              </Typography>
            </div>
          </div>
          <Button fullWidth>Checkout</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CartSummary;
