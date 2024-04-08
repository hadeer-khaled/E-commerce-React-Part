import { useState, useEffect } from "react";

import { getAllOrders, getOrderItems } from "./../../../axios/AdminOrders";

const OrdersManagemet = () => {
  const [orders, setOrders] = useState([]);
  const [FetchingOrderseError, setFetchingOrderseError] = useState(null);

  useEffect(() => {
    getAllOrders()
      .then((response) => {
        const orders = response.data;
        setOrders(orders);
        console.log("Orders:", orders);
      })
      .catch((error) => {
        console.log(error);
        setFetchingOrderseError(error);
      });
  }, []);

  return (
    <div>
      {FetchingOrderseError ? (
        <p>Error fetching orders: {FetchingOrderseError.message}</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={`Order_${order.order_id}`}>{order.order_id}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersManagemet;
