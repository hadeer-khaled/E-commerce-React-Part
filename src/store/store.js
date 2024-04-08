import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";
import userOrders from "./slices/userOrdersSlice";
import productsSliceReducer from "./slices/productsSlice";
import categoriesSliceReducer from "./slices/categoriesSlice";

export default configureStore({
  reducer: {
    userReducer: userProfile,
    userOrdersReducer: userOrders,
    productsSliceReducer: productsSliceReducer,
    categoriesSliceReducer: categoriesSliceReducer,
  },
});
