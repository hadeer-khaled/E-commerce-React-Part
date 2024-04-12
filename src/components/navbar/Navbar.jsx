import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getLoggedUserThunk} from "../../store/slices/userProfileSlice";
import { useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
  const wishlistItems = useSelector(
    (state) => state.userWishlistReducer.wishlistItems
  );
  const {cartItemsCount } = useSelector((state) => state.userShoppingCartReducer);
  // console.log("cartItemsCount ==========", cartItemsCount);
  console.log("wishlist items equals ",wishlistItems)
  const isLoggedIn = !!loggedUser.user_id;
  console.log("isLoggedIn ==========", isLoggedIn);
  console.log("isLoggedIn ==========", loggedUser);

  useEffect(() => {
    // edit the static user id before finishing the feature #########################################################################
    dispatch(getLoggedUserThunk(loggedUser.user_id));
    console.log("loggedUser: " + loggedUser);

  }, [dispatch]);
  

  return (
    <>
      <div className="navbar me-auto fixed top-0 z-50 pe-5 ps-2 py-0 bg-base-200 left-0 right-0 shadow-md h-19 px-14">
        <div className="">
          <div className="">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost drawer-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <ul className="menu p-2 pt-20 w-36 min-h-full bg-base-200 text-base-content z-50">
                {/* Sidebar content here */}
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/userprofile">Porfile</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/shoppingCart">Shoppingcart</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link to="/userorders">Orders</Link>
                </li>
                {/* <li>
                  <Link to='/'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/shoppingCart">Cart</Link>
                </li>
                <li>
                  <Link to="/userprofile">Profile</Link>
                </li>

              </ul>
            </div>
          </div>

          <Link to="/" className="flex-1 text-start btn btn-ghost text-xl uppercase">E-Shop</Link>
        </div>

        <div className="navbar-center bg-gray-600">
          {/* <div className="md:flex items-center">
            <div className="flex flex-col md:flex-row md:mx-6">
              <a className="my-1 text-sm font-medium hover:text-indigo-500 md:mx-4 md:my-0" href="#">Home</a>
              <a className="my-1 text-sm font-medium hover:text-indigo-500 md:mx-4 md:my-0" href="#">Shop</a>
              <a className="my-1 text-sm font-medium hover:text-indigo-500 md:mx-4 md:my-0" href="#">Contact</a>
              <a className="my-1 text-sm font-medium hover:text-indigo-500 md:mx-4 md:my-0" href="#">About</a>
            </div>
          </div> */}
        </div>

        <div className="navbar-end ms-auto w-80">
          {/* <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div> */}

          <Link to="/shop">
            <div className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </Link>

          {!isLoggedIn && (
          <>
            <div id="login" className="px-5">
              <Link to="/login">Login</Link>
            </div>
            <div id="register" className="px-4 pe-2">
              <Link to="/register">Register</Link>
            </div>
          </>
        )}

          {isLoggedIn && (
          <>
            <div id="nav-cart-icons" className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <i className="fas fa-heart text-red-500 fa-lg"></i>
                    <span className="badge badge-sm indicator-item -translate-y-4">
                    {wishlistItems.length}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-40 p-0 bg-base-100 shadow translate-x-16  border border-slate-600 z-50">
                  <div className="card-body">
                    <span className="font-bold text-lg">{wishlistItems.length} Items</span>
                    <div className="card-actions">
                      <Link to="/wishlist" className="btn btn-primary btn-block">
                        Wishlist
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle translate-y-1 me-4">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">{cartItemsCount}</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-40 p-0 bg-base-100 shadow translate-x-16  border border-slate-600 z-50">
                  <div className="card-body">
                    <span className="font-bold text-lg">{cartItemsCount} Items</span>
                    {/* <span className="text-info">Subtotal: $</span> */}
                    <div className="card-actions">
                      <Link to="/shoppingCart" className="btn btn-primary btn-block">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/userprofile" className="pe-1 uppercase">{loggedUser.first_name}</Link>
            <div id="nav-profile" className="flex-none gap-2 me-2">
              <div className="dropdown dropdown-end">
                {/* Profile dropdown content */}
                {/* Assuming you have a user profile picture */}
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Profile"
                      src={loggedUser.image}
                      // src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] py-4 shadow menu menu-sm dropdown-content w-36 h-30 p-2 bg-base-100 rounded-box translate-x-6 -translate-y-1 border border-slate-600 justify-evenly z-50"
                >
                  {/* Profile dropdown menu items */}
                  <li>
                    <Link to="/userprofile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

          <div id="nav-theme" className="dropdown fixed top-20 end-0">
            <div
              tabIndex={0}
              role="button"
              className="btn ps-4 bg-transparent shadow-none border-none w-12 me-0 pe-7 rounded-s-2xl rounded-e-none">
              {/* <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg> */}
              <i className="fas fa-gear fa-lg"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-28 -translate-x-14">
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="default"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="synthwave"
                  value="synthwave"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="coffee"
                  value="coffee"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="dark"
                  value="dark"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="light"
                  value="light"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="bumblebee"
                  value="bumblebee"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
