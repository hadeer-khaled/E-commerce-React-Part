import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShoppingCartItems } from '../../axios/userShoppingCart';

export const fetchShoppingCartItemsThunk = createAsyncThunk(
  'cartItem/fetchShoppingCartItems',
  async (userId) => {
    const cartResponse = await fetchShoppingCartItems(userId);
    console.log("cartResponse",cartResponse)
    return cartResponse;
  }
);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    cartItems: [],
    cartItemsCount: 0,
    totalQuantity: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetShoppingCart : (state)=> {
      state.cartItems=[]
      state.cartItemsCount=0
      state.totalQuantity=0
  }},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingCartItemsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoppingCartItemsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cart_items;
        console.log("inside action", state.cartItems)
        state.cartItemsCount = action.payload.cart_items_count;
        console.log("state.cartItemsCount", state.cartItemsCount)
        state.totalQuantity = action.payload.total_quantity;
        console.log("state.totalQuantity", state.totalQuantity)

      })
      .addCase(fetchShoppingCartItemsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default shoppingCartSlice.reducer;
export const {resetShoppingCart}=shoppingCartSlice.actions
