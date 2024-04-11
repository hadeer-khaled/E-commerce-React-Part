import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";
import userOrders from "./slices/userOrdersSlice";
import productsSliceReducer from "./slices/productsSlice";
import categoriesSliceReducer from "./slices/categoriesSlice";
import wishlist from './slices/userShowWishlistSlice'
import shoppingCart from "./slices/userShoppingCartSlice";
import adminCategories from "./slices/adminCategorySlice"
import adminUsersSlice from "./slices/adminUsersSlice";
export default configureStore({
  reducer: {
    userReducer: userProfile,
    userOrdersReducer: userOrders,
    productsSliceReducer: productsSliceReducer,
    categoriesSliceReducer: categoriesSliceReducer,
    userWishlistReducer:wishlist,
    userShoppingCartReducer:shoppingCart,
    adminCategoryReducer:adminCategories,
    adminUsersReducer:adminUsersSlice,

  },
});
