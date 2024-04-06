import { useState, useEffect } from "react";
import { getOrderDetails } from "../../axios/UserOrders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "./../../store/slices/userOrdersSlice";
import "./UserOrders.css";
const UserOrders = () => {
  const userId = 2;
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

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    try {
      const response = await getOrderDetails(userId, orderId);
      console.log("orderId", orderId);
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "shipped":
        return <div className="badge badge-warning">Shipped</div>;
      case "delivered":
        return <div className="badge badge-success">Delivered</div>;
      case "cancelled":
        return <div className="badge badge-error">Cancelled</div>;
      default:
        return <div className="badge badge-neutral">Pending</div>;
    }
  };

  return (
    <div className="container flex mx-auto mt-4 pt-6 pb-6 rounded-lg">
      <div className="orders-table mx-auto pb-6 rounded-lg">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Total Quantity</th>
              <th>Adsress</th>
              <th>Status</th>
              <th>Details</th>
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
                      className="btn"
                      onClick={() => fetchOrderDetails(order.order_id)}>
                      see details
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="order-details rounded-lg">
        {loading && <p>Loading...</p>}
        {orderDetails.length != 0 && (
          <div>
            {orderDetails.map((orderItem, index) => (
              <>
                <div
                  key={index - ` ${orderItem.order_item_id}`}
                  className="card w-96">
                  <div className="card-body">
                    <div className="product-details">
                      <div className="product-image-div"></div>
                      <div className="product-data-div">
                        <p>{orderItem.product.name}</p>
                        <p>Price: {orderItem.product.price}</p>
                      </div>
                    </div>
                    <div className="">
                      <p>Quantity: {orderItem.quantity}</p>
                      <p>
                        SubTotal:
                        {(orderItem.quantity * orderItem.product.price).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserOrders;

// product

// avg_rating

// name

// price

// quantity
