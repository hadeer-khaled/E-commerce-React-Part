import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";
import userOrders from "./slices/userOrdersSlice";

export default configureStore({
  reducer: {
    userReducer: userProfile,
    userOrdersReducer: userOrders,
  },
});
