import { useState, useEffect } from "react";
import { getOrderDetails } from "../../axios/UserOrders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "./../../store/slices/userOrdersSlice";
const UserOrders = () => {
  const userId = 1;
  const orderId = 1; // Example order ID
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userOrders = useSelector((state) => {
    return state.userOrdersReducer.UserOrdersList;
  });

  useEffect(() => {
    dispatch(getUserOrdersThunk(userId));
  }, [dispatch]);

  console.log("userOrders:", userOrders);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await getOrderDetails(userId, orderId);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (orderDetails.length != 0) {
      console.log("orderDetails", orderDetails);
    }
  }, [orderDetails]);

  return (
    <div className="container mt-3">
      <h1>User Orders </h1>
      <div className="row mt-3">
        {userOrders.map((order) => (
          <div key={`order_${order.order_id}`}>
            <p>Order ID: {order.order_id}</p>
            <p>Date: {order.order_date}</p>
            <p>Amount: {order.total_amount}</p>
            <div className="row mt-3">
              {loading && <p>Loading...</p>}
              {orderDetails.length != 0 && (
                <ul>
                  {orderDetails.map((order, index) => (
                    <li key={index}>
                      <ul>
                        <li>Product Name: {order.product.name}</li>
                        <li>product_price: {order.product_price}</li>
                        <li>Quantity: {order.quantity}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button className="btn" onClick={fetchOrderDetails}>
              see order details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserOrders;
