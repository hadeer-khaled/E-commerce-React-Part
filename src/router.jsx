import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserOrders from "./pages/UserOrders/UserOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Payment from "./pages/payment/Payment";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/footer/Footer";
import OrderDetails from "./pages/payment/OrderDetails/OrderDetails";
import TestPayment from "./pages/payment/TestPayment";


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

// function WithoutLayout() {
//   return (
//     <>
//       <Outlet />
//       {/* <Footer /> */}
//     </>
//   );
// }

const router = createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/userOrders",
        element: <UserOrders />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register/>,
      }
      ,{
        path: "/payment",
        element: <Payment/>,
      },
      {
        path: "/test-payment",
        element: <TestPayment/>,
      },
      {
        path: "/admin/login",
        element: <AdminLogin/>,
      },
      {
        path: "/order-details",
        element: <OrderDetails/>
      }
    ],
  },
  // {
  //   element: <WithoutLayout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: < />,
  //     },
  //   ],
  // },
]);

export default router;
