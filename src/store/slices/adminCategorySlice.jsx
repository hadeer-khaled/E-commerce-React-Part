import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories} from '../../axios/AdminCategory';

export const fetchCategoriesThunk = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetchCategories();
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

      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default categorySlice.reducer;
