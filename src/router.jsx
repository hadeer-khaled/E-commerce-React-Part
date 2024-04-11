import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserOrders from "./pages/UserOrders/UserOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Payment from "./pages/payment/Payment";
import AdminLogin from "./pages/AdminPages/Login/AdminLogin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import OrdersManagemet from "./pages/AdminPages/OrdersManagement/OrdersManagemet";
import OrdersTable from "./pages/AdminPages/OrdersManagement/ordersTable";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/product-details/product-details";
import ShopPage from "./pages/shop/shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import AdminCategory from "./pages/AdminCategory/AdminCategory"
import AdminUsers from "./pages/AdminUsers/AdminUsers"
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
    children: [
      {
        path: '/',
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
        path: '/userorders',
        element: <UserOrders />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
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
      {
        path: "/admin/ordersmanagement",
        element: <OrdersManagemet />,
      },
      {
        path: "/orderstable",
        element: <OrdersTable />,
      },
      {
        path: '/wishlist', // Define the path for the wishlist page
        element: <Wishlist />, // Render the Wishlist component
      },
      {
        path: '/shoppingCart', // Define the path for the shoppingCart page
        element: <ShoppingCart />, // Render the ShoppingCart component
      },
      {
        path:'/adminCategory',
        element:<AdminCategory />
      },
      {
        path:'/adminusers',
        element:<AdminUsers />
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
