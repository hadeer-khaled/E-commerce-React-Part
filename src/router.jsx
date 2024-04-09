import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserOrders from "./pages/UserOrders/UserOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserProfileForm from "./components/userProfileForm/userProfileForm";
import Payment from "./pages/payment/Payment";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/product-details/product-details";
import ShopPage from "./pages/shop/shop";

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
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/userorders",
        element: <UserOrders />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
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
