import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories} from '../../axios/AdminCategory';

export const fetchCategoriesThunk = createAsyncThunk(
  'categories/fetchCategories',
  async ({ page, limit }) => {
    const response = await fetchCategories({ page, limit});
    console.log("from thunk",response)
    return response;
  }
);

const categorySlice = createSlice({
  name: 'adminCategories',
  initialState:{
    categoryList: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoryList = action.payload;
        console.log("from state",action.payload)
        state.currentPage = action.payload.current_page;
        console.log("currentPage",state.currentPage)

        state.totalPages = action.payload.total_pages;
        console.log("totalPages",state.totalPages)


      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default categorySlice.reducer;
