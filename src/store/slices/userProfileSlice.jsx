import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById, updateUserById } from "./../../axios/UserProfile.jsx";

// const userId = 1;

export const getLoggedUserThunk = createAsyncThunk(
  "users/getLoggedUser",
  async (userId) => {
    const res = await getUserById(userId);
    console.log("res.data", res.data);
    return res.data;
  }
);
export const updateUserThunk = createAsyncThunk(
  "users/updateUser",
  async ({ userId, formData }) => {
    console.log("userId", userId);
    const res = await updateUserById(userId, formData);
    console.log("updated user data", res.data);
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
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.LoggedUser = action.payload;
        console.log("Update successful. Updated user data:", action.payload);
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userProfile.reducer;
