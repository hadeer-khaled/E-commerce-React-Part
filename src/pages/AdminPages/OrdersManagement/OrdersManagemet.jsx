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
import Pagination from '../../../components/pagination/Pagination';

const OrdersManagemet = () => {
  const [orders, setOrders] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [FetchingOrderseError, setFetchingOrderseError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [fetchingOrderItemsError, setFetchingOrderItemsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

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

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  function fetchAllOrders(page,limit) {
    
    getAllOrders({page,limit})
      .then((response) => {
        const orders = response.data.orders;
        setTotalPages(response.data.total_pages);
        console.log("response :", response);
        setOrders(orders);
        console.log("Orders:", orders);
      })
      .catch((error) => {
        console.log(error);
        setFetchingOrderseError(error);
      });
  }
  useEffect(() => {
    fetchAllOrders(currentPage,limit);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("page : " + page);
    console.log("limit : " + limit);
    fetchAllOrders(page,limit)
  };

  return (
    <div className="container mx-auto mt-28 mb-28 rounded-lg px-36">
      <div className="">
        <TableContainer className=""
          component={Paper}
          style={{ backgroundColor: "#F5F5F5" }}>
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
        <div className="pt-5">
          <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
export default OrdersManagemet;
