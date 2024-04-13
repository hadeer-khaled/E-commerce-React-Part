import { Outlet, createBrowserRouter } from "react-router-dom";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserOrders from "./pages/UserOrders/UserOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TestPayment from "./pages/payment/TestPayment";
import AdminLogin from "./pages/AdminPages/Login/AdminLogin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import OrdersManagemet from "./pages/AdminPages/OrdersManagement/OrdersManagemet";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/product-details/product-details";
import ShopPage from "./pages/shop/shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminCategory from "./pages/AdminCategory/AdminCategory";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import OrderDetails from "./pages/payment/OrderDetails/OrderDetails";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
// import OrdersTable from "./pages/AdminPages/OrdersManagement/ordersTable";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function UserLayout() {
    
    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
    const path = window.location.pathname
    console.log(path)
    if (path === '/' 
    || path === '/login' 
    || path === '/register' 
    || path === '/shop' 
    || path.startsWith('/products'))
    {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
      );   
    }
    // not logged in
    if (!loggedUser.user_id)
    {
      Swal.fire({
        icon:'error',
        title: 'Not Authorized',
        text: 'Please Login',
      })
      navigate('/login')
    }

    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )

  
}

function AdminLayout() {

    const navigate = useNavigate()
    const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
    const path = window.location.pathname

  if (!loggedUser.role && path !== '/admin/login')
  {
    Swal.fire({
      icon:'error',
      title:"Not logged in",
      text:'Please Login',
      timer:2000
    })
    navigate('/admin/login')
    return  <AdminLogin/>
  }
  
  if(loggedUser.role && loggedUser.role === 'admin')
  {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )
  } 

  return (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )
    
}


const router = createBrowserRouter([
  {
    element: <UserLayout />,
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
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/userprofile",
        element: <UserProfile/>
      },
      {
        path: "/userorders",
        element: <UserOrders />,
      },
      {
        path: "/payment",
        element: <TestPayment />,
      },
      {
        path: "/order-details",
        element: <OrderDetails />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/shoppingCart",
        element: <ShoppingCart />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ]},
    {
      element: <AdminLayout/>,
      children: [
        {
          path: "/admin/login",
          element: <AdminLogin/>
        },
        {
          path: "/admin/products",
          element: <AdminProducts />,
        },
        {
          path: "/admin/categories",
          element: <AdminCategory />,
        },
        {
          path: "/admin/users",
          element: <AdminUsers />,
        },
        {
          path: "/admin/orders",
          element: <OrdersManagemet />,
        }
      ]
    }
    ]);

export default router;