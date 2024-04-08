import getAllOrders from "./../../../axios/AdminOrders";

const OrdersManagemet = () => {
  getAllOrders()
    .then((response) => {
      const orders = response.data; // Assuming that the orders data is returned as response.data
      // Handle the orders data, such as setting it to state or processing it further
      console.log("Orders:", orders);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching orders:", error);
    });
};
export default OrdersManagemet;
