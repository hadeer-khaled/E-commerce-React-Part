import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { getAllOrders, getOrderItems } from "./../../../axios/AdminOrders";
import { cancelOrder } from "./../../../axios/AdminOrders";
import { Row } from "./../../../components/AdminOrdersTableRow/Row";

const OrdersManagemet = () => {
  const [orders, setOrders] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [FetchingOrderseError, setFetchingOrderseError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [fetchingOrderItemsError, setFetchingOrderItemsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  const handleCollapse = (orderId) => {
    if (orderId === openRowId) {
      setOpenRowId(null);
    } else {
      setOpenRowId(orderId);
      getOrderItems(orderId)
        .then((response) => {
          const orderItems = response.data;
          console.log("orderItems", orderItems);
          setOrderItems(orderItems);
        })
        .catch((error) => {
          console.error("Error fetching order items:", error);
          setFetchingOrderItemsError(error);
        });
    }
  };

  function fetchAllOrders() {
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
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    cancelOrder(orderId)
      .then(() => {
        console.log("Order canceled successfully");
        fetchAllOrders();
      })
      .catch((error) => {
        console.error("Error canceling order", error);
      });
  };
  return (
    <div className="container  mx-auto mt-28 mb-28">
      <TableContainer
        component={Paper}
        style={{ backgroundColor: "#9e9e9e0d" }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Order Date
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Total Price
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Adsress
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Cancel
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <Row
                key={order.order_id}
                order={order}
                orderItems={orderItems}
                handleCollapse={handleCollapse}
                handleCancelOrder={handleCancelOrder}
                currentDate={currentDate}
                isOpen={order.order_id === openRowId}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default OrdersManagemet;
