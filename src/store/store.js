import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";
import userOrders from "./slices/userOrdersSlice";
import wishlist from './slices/userShowWishlistSlice'
export default configureStore({
  reducer: {
    userReducer: userProfile,
    userOrdersReducer: userOrders,
    userWishlistReducer:wishlist 

  },
});
