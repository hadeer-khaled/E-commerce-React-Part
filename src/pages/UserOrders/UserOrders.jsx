import { useEffect } from "react";
// import { getUserOrders } from "../../axios/UserOrders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "./../../store/slices/userOrdersSlice";
const UserOrders = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => {
    return state.userOrdersReducer.UserOrdersList;
  });

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  console.log("userOrders:", userOrders);
  return (
    <div className="container mt-3">
      <h1>User Orders </h1>
      <div className="row mt-3"></div>
    </div>
  );
};
export default UserOrders;
