import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/userSlice";
import adminSlice from "../features/admins/adminSlice";
import cartSlice from "../features/cart/cartSlice";
import transactionSlice from "../features/transaction/transactionSlice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    admins: adminSlice,
    cart: cartSlice,
    transaction: transactionSlice,
  },
});

export default store;
