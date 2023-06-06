import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id_product === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
      state.total += action.payload.price * action.payload.quantity;
    },

    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      const item = state.items[index];
      console.log(action.payload);
      // state.total -= item.p * item.quantity;
      state.items.splice(index, 1);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id_product === action.payload
      );
      item.quantity--;
      state.total -= item.product_price;
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id_product === action.payload
      );
      item.quantity++;
      state.total += item.product_price;
    },
  },
});

export const { addItem, removeItem, decreaseQuantity, increaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
