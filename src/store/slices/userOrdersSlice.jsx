import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserOrders } from "./../../axios/UserOrders.jsx";

export const getUserOrdersThunk = createAsyncThunk(
  "user/getUserOrders",
  async (userId) => {
    const res = await getUserOrders(userId);
    console.log("res", res);
    return res.data;
  }
);
const userOrders = createSlice({
  name: "userOrders",
  initialState: {
    UserOrdersList: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UserOrdersList = action.payload;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userOrders.reducer;
