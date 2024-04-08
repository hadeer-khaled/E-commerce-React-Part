import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import { getAllOrders, getOrderItems } from "./../../../axios/AdminOrders";
import {
  formatDate,
  getStatusBadge,
  isOrderDateOlderThan3Days,
} from "./../../../OrderHelperFunctions";
import { cancelOrder } from "./../../../axios/AdminOrders";

function Row({
  order,
  orderItems,
  isOpen,
  handleCollapse,
  handleCancelOrder,
  currentDate,
}) {
  const orderId = order.order_id;
  const [open, setOpen] = React.useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              handleCollapse(orderId);
            }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{order.order_id}</TableCell>
        <TableCell align="center">{formatDate(order.order_date)}</TableCell>
        <TableCell align="center">{order.total_amount}</TableCell>
        <TableCell align="center">{order.total_quantity}</TableCell>
        <TableCell align="center">
          {order.address} - {order.city}
        </TableCell>
        <TableCell align="center">
          {getStatusBadge(order.shipment.status)}
        </TableCell>
        <TableCell align="center">
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
        </TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: "#9e9e9e0d" }}>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            textAlign: "center",
          }}
          colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" className="ml-7" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Image
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Price
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {" "}
                      Sub Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems.map((orderItem) => (
                    <TableRow key={`orderItem_${orderItem.order_item_id}`}>
                      <TableCell align="center">
                        <img
                          src={`${orderItem.product.image}`}
                          alt="product  image"
                          style={{ width: "60px" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {orderItem.product.name}
                      </TableCell>
                      <TableCell align="center">
                        {orderItem.product.price}
                      </TableCell>
                      <TableCell align="center">{orderItem.quantity}</TableCell>
                      <TableCell align="center">
                        {(orderItem.quantity * orderItem.product.price).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrdersTable() {
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
}
