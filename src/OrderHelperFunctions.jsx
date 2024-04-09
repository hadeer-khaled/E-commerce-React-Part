export const formatDate = (dateString) => {
  const dateParts = dateString.split(" ")[0].split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-indexed
  const day = parseInt(dateParts[2]);
  const date = new Date(year, month, day);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};
export const getStatusBadge = (status) => {
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
export const isOrderDateOlderThan3Days = (currentDate, orderDate) => {
  const differenceInMs = currentDate - new Date(orderDate);
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
  const isOrderDateOlderThan3Days = differenceInDays > 3;
  return isOrderDateOlderThan3Days;
};
