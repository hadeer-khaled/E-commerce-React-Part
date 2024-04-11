import axiosInstance from "./config";

export const fetchShoppingCartItems = async (userId) => {
  try {
    const response = await axiosInstance.get('/cartItem/view-cart/', { params: { user_id: userId } });
    if (response) {
      console.log("from cart axios",response.data);
      return response.data;
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.error('Error fetching shopping cart items:', error);
    throw error; 
  }
};

export const incrementQuantityInShoppingCart = async (userId, cartItemId) => {
    console.log("inside axios");
    try {
      const response = await axiosInstance.post('/cartItem/increment-quantity/', {
          user_id: userId,
          cart_item_id: cartItemId

      });
      console.log('Quantity incremented:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error in incrementing quantity:', error);
      throw error; 
    }
  };
  

  export const decrementQuantityInShoppingCart = async (userId, cartItemId) => {
    try {
      const response = await axiosInstance.post('/cartItem/decrement-quantity/', {
          user_id: userId,
          cart_item_id: cartItemId
      });
      console.log('Quantity decremented:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error in decrementing quantity:', error);
      throw error; 
    }
  };
  

  export const removeCartItemInShoppingCart = async (userId, cartItemId) => {
    try {
      const response = await axiosInstance.delete(`/cartItem/remove-from-cart/?user_id=${userId}&cart_item_id=${cartItemId}`);
      console.log('Cart item removed successfully :', response.data);
      return response.data; 
    } catch (error) {
      console.error('cart item can not be removed:', error);
      throw error; 
    }
  };
  


  export const removeCartInShoppingCart = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/shoppingCart/delete/?user_id=${userId}`);
      console.log('Cart  removed successfully :', response.data);
      return response.data; 
    } catch (error) {
      console.error('cart can not be removed:', error);
      throw error; 
    }
  };


  export const addToCart = async (userId, productId) => {
    try {
      const response = await axiosInstance.post('/cartItem/add-to-cart/', {
        user_id: userId,
        product_id: productId
      });
      console.log('Added to cart:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error; 
    }
  };