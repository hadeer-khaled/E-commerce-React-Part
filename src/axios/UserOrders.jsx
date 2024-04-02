import axiosInstance from "./config";

export const getUserOrders = (userId) => {
  return axiosInstance.get(`orders/user_order/${userId}/`);
};
