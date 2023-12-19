import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
      // localStorage.setItem("cart-item", JSON.stringify(state));
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export const counterSliceReducer = counterSlice.reducer;

export const { add, remove } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
// export default cartSlice.reducer;
