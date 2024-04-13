import axiosInstance from "./config";
export const getAllOrders = ({page,limit}) => {
  return axiosInstance.get(`orders/?page=${page}&limit=${limit}`);
};
export const getOrderItems = (orderId) => {
  return axiosInstance.get(`orders/order/${orderId}/order_items`);
};

export const cancelOrder = (orderId) => {
  return axiosInstance.patch(`orders/order/${orderId}/`);
};
