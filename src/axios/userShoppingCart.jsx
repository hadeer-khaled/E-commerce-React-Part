import axiosInstance from "./config";

export const fetchShoppingCartItems = async (userId) => {
  try {
    const response = await axiosInstance.get('/cartItem/view-cart/', { params: { user_id: userId } });
    if (response) {
      console.log(response.data);
      return response.data;
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.error('Error fetching shopping cart items:', error);
    throw error; 
  }
};

export const incrementQuantityInWishList = async (userId, cartItemId) => {
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
  

  export const decrementQuantityInWishList = async (userId, cartItemId) => {
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
  