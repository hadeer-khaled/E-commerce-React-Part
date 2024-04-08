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

function Row({ order, orderItems, isOpen, handleCollapse }) {
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
        <TableCell align="right">{order.order_id}</TableCell>
        <TableCell align="right">{order.order_date}</TableCell>
        <TableCell align="right">{order.total_amount}</TableCell>
        <TableCell align="right">{order.total_quantity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}

                  {orderItems.map((orderItem) => (
                    <TableRow key={orderItem.quantity}>
                      <TableCell>{orderItem.product.name}</TableCell>
                      <TableCell>{orderItem.product.name}</TableCell>
                      <TableCell align="right">
                        {orderItem.product.price}
                      </TableCell>
                      <TableCell align="right">
                        {orderItem.product.price}
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
  const [openRowId, setOpenRowId] = useState(null); // State to track the ID of the currently open row
  const [FetchingOrderseError, setFetchingOrderseError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [fetchingOrderItemsError, setFetchingOrderItemsError] = useState(null);

  // const handleCollapse = (orderId) => {
  //   getOrderItems(orderId)
  //     .then((response) => {
  //       const orderItems = response.data;
  //       console.log("orderItems", orderItems);
  //       setOrderItems(orderItems);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching orders:", error);
  //     });
  // };
  const handleCollapse = (orderId) => {
    // Check if the clicked row is already open
    if (orderId === openRowId) {
      setOpenRowId(null); // Close the row if it's already open
    } else {
      setOpenRowId(orderId); // Otherwise, open the clicked row
      // Fetch order items for the clicked row
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
    <div className="contianer mt-28">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <Row
                key={order.order_id}
                order={order}
                orderItems={orderItems}
                handleCollapse={handleCollapse}
                isOpen={order.order_id === openRowId}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
