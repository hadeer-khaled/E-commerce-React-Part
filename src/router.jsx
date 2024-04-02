import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import Login from "./pages/Login";
function Layout() {
  return (
    <>
      {/* <Navbar /> */}
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
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element:<Login/>,
      },
      {
        path: "/register",
        element: <><h1>Rgister Page</h1></>,
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
