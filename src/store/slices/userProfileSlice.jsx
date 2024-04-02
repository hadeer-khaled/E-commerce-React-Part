import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "./../../axios/UserProfile.jsx";

const userId = 1;

export const getLoggedUserThunk = createAsyncThunk(
  "users/getLoggedUser",
  async () => {
    const res = await getUserById(userId);
    console.log("res.data", res.data);
    return res.data;
  }
);

const userProfile = createSlice({
  name: "loggedUser",
  initialState: {
    LoggedUser: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LoggedUser = action.payload;
      })
      .addCase(getLoggedUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userProfile.reducer;
