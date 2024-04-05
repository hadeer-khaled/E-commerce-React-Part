import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserOrders from "./pages/UserOrders/UserOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Wishlist from "../src/pages/Wishlist/Wishlist";
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
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
        path: '/userprofile',
        element: <UserProfile />,
      },
      {
        path: '/userOrders',
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
        path: '/wishlist', // Define the path for the wishlist page
        element: <Wishlist />, // Render the Wishlist component
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
