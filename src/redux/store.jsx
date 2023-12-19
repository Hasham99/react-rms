import { configureStore } from "@reduxjs/toolkit";
import { cartSliceReducer, counterSliceReducer } from "./CartSlice";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    counter: counterSliceReducer,
  },
});

export default store;
