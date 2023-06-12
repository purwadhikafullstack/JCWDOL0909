import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/userSlice";
import cartSlice from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    cart: cartSlice,
  },
});

export default store;
