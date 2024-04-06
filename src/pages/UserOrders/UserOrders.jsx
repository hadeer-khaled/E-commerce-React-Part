import { useState, useEffect } from "react";
import { getOrderDetails } from "../../axios/UserOrders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "./../../store/slices/userOrdersSlice";
import "./UserOrders.css";
import productImage from "./../../assets/product.png";
const UserOrders = () => {
  const userId = 11;
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
  const handleCancelOrder = () => {};

  return (
    <div className="container user-order-container flex sm:flex-col md:flex-col lg:flex-row   mx-auto mt-28 pt-6 pb-6 rounded-lg">
      <div className="orders-table mx-auto pb-6 rounded-lg mr-3 ">
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
                  {
                    <button
                      className="btn btn-outline  btn-error btn-sm rounded-full"
                      onClick={() => handleCancelOrder(order.order_id)}>
                      Cancel
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="order-details rounded-lg ">
        {loading && <p>Loading...</p>}
        {orderDetails.length != 0 && (
          <div>
            <h3 className="my-4 font-bold	"> Order Details</h3>
            <hr></hr>
            {orderDetails.map((orderItem, index) => (
              <>
                <div
                  key={index - ` ${orderItem.order_item_id}`}
                  className="card w-96">
                  <div className="card-body">
                    <div className="product-details flex justify-between items-center	w-full">
                      <div className="product-image-div">
                        <img
                          src={productImage}
                          alt="Description of the image"
                          style={{ width: "150px" }}
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
                    {/* <div className="">
                      
                    </div> */}
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
