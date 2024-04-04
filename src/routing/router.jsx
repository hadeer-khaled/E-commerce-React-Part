import {createBrowserRouter } from 'react-router-dom';
import Wishlist from '../pages/wishlist/wishlist'

// function WithoutLayout() {
//   return <Outlet />;
// }

const router = createBrowserRouter([
  {
    // element: <WithoutLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
    ],
  },
]);

export default router;
