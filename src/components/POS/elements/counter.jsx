import { Card, CardBody } from "@material-tailwind/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../../redux/CartSlice";

const counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <Card>
        <CardBody>
          <div>
            <h1>Counter</h1>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default counter;
