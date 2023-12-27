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
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, remove } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
// export default cartSlice.reducer;
