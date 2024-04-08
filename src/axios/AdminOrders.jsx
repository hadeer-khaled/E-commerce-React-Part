import axiosInstance from "./config";
export const getAllOrders = () => {
  return axiosInstance.get(`orders/`);
};
export const getOrderItems = (orderId) => {
  return axiosInstance.get(`orders/order/${orderId}/order_items`);
};

export const cancelOrder = (orderId) => {
  return axiosInstance.patch(`orders/order/${orderId}/`);
};
