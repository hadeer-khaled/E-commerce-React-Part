import axiosInstance from "./config";

// export const getUserOrders = (userId) => {
//   return axiosInstance.get(`orders/userorder/${userId}/`);
// };

export const getUserOrders = (userId) => {
  return axiosInstance.get(`users/user/${userId}/orders/`);
};

export const getOrderDetails = (userId, orderId) => {
  return axiosInstance.get(`users/user/${userId}/orders/order/${orderId}/`);
};
export const cancelOrder = (userId, orderId) => {
  console.log("in axios:", orderId);
  return axiosInstance.patch(`orders/order/${orderId}/`);
};
