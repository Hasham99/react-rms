import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   time: ``,
//   TotalAmount: ``,
//   items: [],
// };
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.length) {
        state.splice(indexToRemove, 1);
      }
    },
    clearAll(state) {
      // Clear all items in the cart
      state.length = 0;
    },
  },
});

export const { addToCart, remove, clearAll } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
// export default cartSlice.reducer;
