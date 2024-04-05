import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";
import userOrders from "./slices/userOrdersSlice";
import productsSliceReducer from "./slices/productsSlice";

export default configureStore({
  reducer: {
    userReducer: userProfile,
    userOrdersReducer: userOrders,
    productsSliceReducer: productsSliceReducer,
  },
});
