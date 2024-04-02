import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfileSlice";

export default configureStore({
  reducer: {
    userReducer: userProfile,
  },
});
