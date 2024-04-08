import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";
import userOrders from "./slices/userOrdersSlice";
import wishlist from './slices/userShowWishlistSlice'
import shoppingCart from "./slices/userShoppingCartSlice";
import adminCategories from "./slices/adminCategorySlice"
export default configureStore({
  reducer: {
    userReducer: userProfile,
    userOrdersReducer: userOrders,
    userWishlistReducer:wishlist,
    userShoppingCartReducer:shoppingCart,
    adminCategoryReducer:adminCategories,

  },
});
