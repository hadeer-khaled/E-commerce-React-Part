import { useEffect } from "react";
// import { getUserOrders } from "../../axios/UserOrders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "./../../store/slices/userOrdersSlice";
const UserOrders = () => {
  const userId = 1;

  const dispatch = useDispatch();
  const userOrders = useSelector((state) => {
    return state.userOrdersReducer.UserOrdersList;
  });

  useEffect(() => {
    dispatch(getUserOrdersThunk(userId));
  }, [dispatch]);

  console.log("userOrders:", userOrders);
  return (
    <div className="container mt-3">
      <h1>User Orders </h1>
      <div className="row mt-3">
        {userOrders.map((order) => (
          <div key={`order_${order.order_id}`}>
            <p>Order ID: {order.order_id}</p>
            <p>Date: {order.order_date}</p>
            <p>Amount: {order.total_amount}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserOrders;
