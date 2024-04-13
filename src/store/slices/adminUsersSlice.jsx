import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../axios/AdminUsers";

const initialState = {
  userList: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const getUsersThunk = createAsyncThunk(
  "users/getUsers",
  async ({ page, limit }) => {
    const data = await fetchUsers({ page, limit });
    return data;
  }
);


const userSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
        state.currentPage = action.payload.current_page;
        console.log("currentPage",state.currentPage)

        state.totalPages = action.payload.total_pages;
        console.log("totalPages",state.totalPages)
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
