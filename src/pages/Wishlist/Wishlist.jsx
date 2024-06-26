import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistItemsThunk } from "../../store/slices/userShowWishlistSlice";
import { addToWishlist, removeProductFromWishlist } from "../../axios/UserWishlist";
import Swal from 'sweetalert2'
export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.userWishlistReducer.wishlistItems
  );
  const [showAlert, setShowAlert] = useState(false);
  // const userId = 2;
  const loggedUser = useSelector((state) => state.userReducer.LoggedUser);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    setUserId(loggedUser.user_id);
    console.log("from wishlist page",userId);
    if(userId!=0){
      console.log(userId)
      dispatch(fetchWishlistItemsThunk(userId));
    }
  }, [userId]);

  const handleClick = async (productId) => {
    try {
      await removeProductFromWishlist(userId, productId);

      dispatch(fetchWishlistItemsThunk(userId));

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error handling remove product:", error.message);
    }
  };

  // const handleAddToWishlist = async (productId) => {
  //   try {
  //     const isProductInWishlist = wishlistItems.some(item => item.product_id === productId);
  //     if (isProductInWishlist) {
  //       Swal.fire({
  //         title: "Adding the same product!",
  //         text: "This product is already in your wishlist.",
  //         icon: "info"
  //       });
  //     } else {
  //       const response = await addToWishlist(userId, productId); 
  //         Swal.fire({
  //         title: "Product added to wishlist!",
  //         text: response.message,
  //         icon: "success"
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error adding product to wishlist:", error);
  //   }
  // };
  return (
    <div className="flex mt-20">
      {/* Image */}
      <div>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/wish-list-8725018-7045277.png"
          alt="Wishlist"
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto flex-grow">
      {wishlistItems.length > 0 ? (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Favorite</th>
              <th>Remove Favorite</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product, index) => (
              <tr key={index} >
                <td>
                  <div className="flex items-center gap-9">
                    <div className="avatar">
                      <div className="mask mask-squircle w-28 h-28">
                        <img
                          src={product.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button className="btn text-orange-700	" disabled>
                    Added
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleClick(product.product_id)}
                  >
                    Remove
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>

                  {/* Alert */}
                  {showAlert && (
                    <div className="toast toast-bottom toast-end">
                      <div className="alert alert-success">
                        <span>Product : {product.name} removed successfully from wishlist.</span>
                      </div>
                    </div>
                  )}
                </td>
                {/* <td>
          <button className="btn btn-outline" onClick={() =>handleAddToWishlist(product.product_id)}>
            Add to Wishlist
          </button>
        </td> */}
              </tr>
            ))}
          </tbody>
        </table>
         ) : (
          <h2 className="text-error ">Your wishlist is empty</h2>
        )}
      </div>

    </div>
  );
}
