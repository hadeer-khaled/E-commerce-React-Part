import { useState, useEffect } from "react";
import { getOrderDetails, cancelOrder } from "../../axios/UserOrders.jsx";
import {
  getProductRatings,
  setProductRating,
} from "./../../axios/UserRatings.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "./../../store/slices/userOrdersSlice";
import "./UserOrders.css";
import {
  formatDate,
  getStatusBadge,
  isOrderDateOlderThan3Days,
} from "./../../OrderHelperFunctions.jsx";

import Rating from "@mui/material/Rating";

const UserOrders = () => {
  // const userId = 10;
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
  const [userId, setUserId] = useState(0);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userOrders = useSelector((state) => {
    return state.userOrdersReducer.UserOrdersList;
  });
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    setUserId(loggedUser.user_id);
    console.log("userId", userId);
    if (userId != 0) {
      console.log("userId", userId);
      dispatch(getUserOrdersThunk(userId));
    }
  }, [userId]);

  console.log("userOrders:", userOrders);

  useEffect(() => {
    if (orderDetails.length != 0) {
      console.log("orderDetails", orderDetails);
    }
  }, [orderDetails]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    try {
      const response = await getOrderDetails(userId, orderId);
      console.log("orderId", orderId);
      const updatedProducts = response.data.map((item) => ({
        ...item,
        product_rating: 0,
      }));
      setOrderDetails(updatedProducts);
      console.log("OrderDetails After add product_rating: 0", orderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancelOrder = (orderId) => {
    cancelOrder(userId, orderId)
      .then(() => {
        console.log("Order canceled successfully");
        dispatch(getUserOrdersThunk(userId));
      })
      .catch((error) => {
        console.error("Error canceling order", error);
      });
  };
  const updatedOrderDetailsRating = (newValue, produc_id) => {
    const updatedProducts = orderDetails.map((item) => {
      if (item.product_id === produc_id) {
        return {
          ...item,
          product_rating: newValue,
        };
      }
      return item;
    });
    setOrderDetails(updatedProducts);
  };
  const handleRating = (newValue, produc_id) => {
    setRatingValue(newValue);
    updatedOrderDetailsRating(newValue, produc_id);
    setProductRating(produc_id, userId, newValue)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container user-order-container flex sm:flex-col md:flex-col lg:flex-row mx-auto mt-28 pt-6 pb-6 rounded-lg">
      <div className="orders-table pb-6 rounded-lg mx-3 ">
        <table className="table table-zebra ">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Quantity</th>
              <th>Adsress</th>
              <th>Status</th>
              <th>Details</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={`order_${order.order_id}`}>
                <td>{order.order_id}</td>
                <td>{formatDate(order.order_date)}</td>
                <td>{order.total_amount}</td>
                <td>{order.total_quantity}</td>
                <td>
                  {order.address} - {order.city}
                </td>
                <td>{getStatusBadge(order.shipment.status)}</td>
                <td>
                  {
                    <button
                      className="btn btn-outline btn-sm rounded-full"
                      onClick={() => fetchOrderDetails(order.order_id)}>
                      see details
                    </button>
                  }
                </td>
                <td>
                  {order.shipment.status !== "cancelled" &&
                  order.shipment.status !== "delivered" &&
                  !isOrderDateOlderThan3Days(currentDate, order.order_date) ? (
                    <button
                      className="btn btn-outline btn-error btn-sm rounded-full"
                      onClick={() => handleCancelOrder(order.order_id)}>
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline btn-error btn-sm rounded-full"
                      disabled>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-red-900	 text-sm mt-4">
          Please note that orders older than three days cannot be canceled.
        </p>
      </div>
      <div className="order-details rounded-lg ">
        {loading && <p>Loading...</p>}
        {orderDetails.length != 0 && (
          <div>
            <h3 className="my-4 font-bold	"> Order Details</h3>
            <hr></hr>
            {orderDetails.map((orderItem) => (
              <div key={`order_${orderItem.order_item_id}`}>
                <div className="card w-96">
                  <div className="order-item-card-body">
                    <div className="product-details flex justify-between items-center	w-full">
                      <div className="product-image-div">
                        <img
                          src={orderItem.product.image}
                          alt="product  image"
                          style={{ width: "160px" }}
                        />
                        <Rating
                          className="mt-3"
                          name="simple-controlled"
                          value={orderItem.product_rating}
                          onChange={(event, newValue) => {
                            handleRating(newValue, orderItem.product_id);
                          }}
                        />
                      </div>
                      <div className="product-data-div text-sm">
                        <p className="mt-2">
                          <span className="font-bold	">
                            {orderItem.product.name}
                          </span>
                        </p>
                        <p className="mt-2">
                          <span className="font-bold	">Price: </span>
                          {orderItem.product.price}
                        </p>
                        <p className="mt-2">
                          <span className="font-bold	">Quantity: </span>
                          {orderItem.quantity}
                        </p>
                        <p className="mt-2">
                          <span className="font-bold	"> Sub Total: </span>
                          {(
                            orderItem.quantity * orderItem.product.price
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserOrders;
